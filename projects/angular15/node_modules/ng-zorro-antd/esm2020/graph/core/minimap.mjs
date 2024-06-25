/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { drag } from 'd3-drag';
import { pointer, select } from 'd3-selection';
import { zoomIdentity } from 'd3-zoom';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
const FRAC_VIEWPOINT_AREA = 0.8;
export class Minimap {
    constructor(ngZone, svg, zoomG, mainZoom, minimap, maxWidth, labelPadding) {
        this.ngZone = ngZone;
        this.svg = svg;
        this.zoomG = zoomG;
        this.mainZoom = mainZoom;
        this.minimap = minimap;
        this.maxWidth = maxWidth;
        this.labelPadding = labelPadding;
        this.unlisteners = [];
        const minimapElement = select(minimap);
        const minimapSvgElement = minimapElement.select('svg');
        const viewpointElement = minimapSvgElement.select('rect');
        this.canvas = minimapElement.select('canvas.viewport').node();
        this.canvasRect = this.canvas.getBoundingClientRect();
        const handleEvent = (event) => {
            const minimapOffset = this.minimapOffset();
            const width = Number(viewpointElement.attr('width'));
            const height = Number(viewpointElement.attr('height'));
            const clickCoords = pointer(event, minimapSvgElement.node());
            this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
            this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
            this.updateViewpoint();
        };
        this.viewpointCoord = { x: 0, y: 0 };
        const subject = drag().subject(Object);
        const dragEvent = subject.on('drag', handleEvent);
        viewpointElement.datum(this.viewpointCoord).call(dragEvent);
        // Make the minimap clickable.
        minimapSvgElement.on('click', event => {
            if (event.defaultPrevented) {
                // This click was part of a drag event, so suppress it.
                return;
            }
            handleEvent(event);
        });
        this.unlisteners.push(() => {
            subject.on('drag', null);
            minimapSvgElement.on('click', null);
        });
        this.viewpoint = viewpointElement.node();
        this.minimapSvg = minimapSvgElement.node();
        this.canvasBuffer = minimapElement.select('canvas.buffer').node();
        this.update();
    }
    destroy() {
        while (this.unlisteners.length) {
            this.unlisteners.pop()();
        }
    }
    minimapOffset() {
        return {
            x: (this.canvasRect.width - this.minimapSize.width) / 2,
            y: (this.canvasRect.height - this.minimapSize.height) / 2
        };
    }
    updateViewpoint() {
        // Update the coordinates of the viewpoint rectangle.
        select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
        // Update the translation vector of the main svg to reflect the
        // new viewpoint.
        const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
        const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
        select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
    }
    update() {
        let sceneSize = null;
        try {
            // Get the size of the entire scene.
            sceneSize = this.zoomG.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch (e) {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const svgSelection = select(this.svg);
        // Read all the style rules in the document and embed them into the svg.
        // The svg needs to be self contained, i.e. all the style rules need to be
        // embedded so the canvas output matches the origin.
        let stylesText = '';
        for (const k of new Array(document.styleSheets.length).keys()) {
            try {
                const cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                if (cssRules == null) {
                    continue;
                }
                for (const i of new Array(cssRules.length).keys()) {
                    // Remove tf-* selectors from the styles.
                    stylesText += `${cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '')}\n`;
                }
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
        }
        // Temporarily add the css rules to the main svg.
        const svgStyle = svgSelection.append('style');
        svgStyle.text(stylesText);
        // Temporarily remove the zoom/pan transform from the main svg since we
        // want the minimap to show a zoomed-out and centered view.
        const zoomGSelection = select(this.zoomG);
        const zoomTransform = zoomGSelection.attr('transform');
        zoomGSelection.attr('transform', null);
        // Since we add padding, account for that here.
        sceneSize.height += this.labelPadding * 2;
        sceneSize.width += this.labelPadding * 2;
        // Temporarily assign an explicit width/height to the main svg, since
        // it doesn't have one (uses flex-box), but we need it for the canvas
        // to work.
        svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);
        // Since the content inside the svg changed (e.g. a node was expanded),
        // the aspect ratio have also changed. Thus, we need to update the scale
        // factor of the minimap. The scale factor is determined such that both
        // the width and height of the minimap are <= maximum specified w/h.
        this.scaleMinimap = this.maxWidth / Math.max(sceneSize.width, sceneSize.height);
        this.minimapSize = {
            width: sceneSize.width * this.scaleMinimap,
            height: sceneSize.height * this.scaleMinimap
        };
        const minimapOffset = this.minimapOffset();
        // Update the size of the minimap's svg, the buffer canvas and the
        // viewpoint rect.
        select(this.minimapSvg).attr(this.minimapSize);
        select(this.canvasBuffer).attr(this.minimapSize);
        if (this.translate != null && this.zoom != null) {
            // Update the viewpoint rectangle shape since the aspect ratio of the
            // map has changed.
            this.ngZone.runOutsideAngular(() => reqAnimFrame(() => this.zoom()));
        }
        // Serialize the main svg to a string which will be used as the rendering
        // content for the canvas.
        const svgXml = new XMLSerializer().serializeToString(this.svg);
        // Now that the svg is serialized for rendering, remove the temporarily
        // assigned styles, explicit width and height and bring back the pan/zoom
        // transform.
        svgStyle.remove();
        svgSelection.attr('width', '100%').attr('height', '100%');
        zoomGSelection.attr('transform', zoomTransform);
        const image = document.createElement('img');
        const onLoad = () => {
            // Draw the svg content onto the buffer canvas.
            const context = this.canvasBuffer.getContext('2d');
            context.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
            context.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);
            this.ngZone.runOutsideAngular(() => {
                reqAnimFrame(() => {
                    // Hide the old canvas and show the new buffer canvas.
                    select(this.canvasBuffer).style('display', 'block');
                    select(this.canvas).style('display', 'none');
                    // Swap the two canvases.
                    [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
                });
            });
        };
        image.addEventListener('load', onLoad);
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
        this.unlisteners.push(() => {
            image.removeEventListener('load', onLoad);
        });
    }
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     *
     * @param transform
     */
    zoom(transform) {
        if (this.scaleMinimap == null) {
            // Scene is not ready yet.
            return;
        }
        // Update the new translate and scale params, only if specified.
        if (transform) {
            this.translate = [transform.x, transform.y];
            this.scaleMain = transform.k;
        }
        // Update the location of the viewpoint rectangle.
        const svgRect = this.svg.getBoundingClientRect();
        const minimapOffset = this.minimapOffset();
        const viewpointSelection = select(this.viewpoint);
        this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
        this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
        const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
        const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
        viewpointSelection
            .attr('x', this.viewpointCoord.x + minimapOffset.x)
            .attr('y', this.viewpointCoord.y + minimapOffset.y)
            .attr('width', viewpointWidth)
            .attr('height', viewpointHeight);
        // Show/hide the minimap depending on the viewpoint area as fraction of the
        // whole minimap.
        const mapWidth = this.minimapSize.width;
        const mapHeight = this.minimapSize.height;
        const x = this.viewpointCoord.x;
        const y = this.viewpointCoord.y;
        const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
        const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
        const fracIntersect = (w * h) / (mapWidth * mapHeight);
        if (fracIntersect < FRAC_VIEWPOINT_AREA) {
            this.minimap.classList.remove('hidden');
        }
        else {
            this.minimap.classList.add('hidden');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvZ3JhcGgvY29yZS9taW5pbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUlILE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFnQixZQUFZLEVBQWlCLE1BQU0sU0FBUyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUszRCxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztBQUVoQyxNQUFNLE9BQU8sT0FBTztJQWNsQixZQUNVLE1BQWMsRUFDZCxHQUFrQixFQUNsQixLQUFrQixFQUNsQixRQUE0QyxFQUM1QyxPQUFvQixFQUNwQixRQUFnQixFQUNoQixZQUFvQjtRQU5wQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQW9DO1FBQzVDLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQVR0QixnQkFBVyxHQUFtQixFQUFFLENBQUM7UUFXdkMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJ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dXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZHJhZyB9IGZyb20gJ2QzLWRyYWcnO1xuaW1wb3J0IHsgcG9pbnRlciwgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7IFpvb21CZWhhdmlvciwgem9vbUlkZW50aXR5LCBab29tVHJhbnNmb3JtIH0gZnJvbSAnZDMtem9vbSc7XG5cbmltcG9ydCB7IHJlcUFuaW1GcmFtZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9wb2x5ZmlsbCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOelpvb21UcmFuc2Zvcm0gfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuXG5jb25zdCBGUkFDX1ZJRVdQT0lOVF9BUkVBID0gMC44O1xuXG5leHBvcnQgY2xhc3MgTWluaW1hcCB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjYW52YXNSZWN0OiBDbGllbnRSZWN0O1xuICBwcml2YXRlIGNhbnZhc0J1ZmZlcjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgbWluaW1hcFN2ZzogU1ZHU1ZHRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWV3cG9pbnQ6IFNWR1JlY3RFbGVtZW50O1xuICBwcml2YXRlIHNjYWxlTWluaW1hcCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBzY2FsZU1haW4hOiBudW1iZXI7XG4gIHByaXZhdGUgdHJhbnNsYXRlITogW251bWJlciwgbnVtYmVyXTtcbiAgcHJpdmF0ZSB2aWV3cG9pbnRDb29yZDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICBwcml2YXRlIG1pbmltYXBTaXplITogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuXG4gIHByaXZhdGUgdW5saXN0ZW5lcnM6IFZvaWRGdW5jdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHN2ZzogU1ZHU1ZHRWxlbWVudCxcbiAgICBwcml2YXRlIHpvb21HOiBTVkdHRWxlbWVudCxcbiAgICBwcml2YXRlIG1haW5ab29tOiBab29tQmVoYXZpb3I8TnpTYWZlQW55LCBOelNhZmVBbnk+LFxuICAgIHByaXZhdGUgbWluaW1hcDogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBtYXhXaWR0aDogbnVtYmVyLFxuICAgIHByaXZhdGUgbGFiZWxQYWRkaW5nOiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgbWluaW1hcEVsZW1lbnQgPSBzZWxlY3QobWluaW1hcCk7XG4gICAgY29uc3QgbWluaW1hcFN2Z0VsZW1lbnQgPSBtaW5pbWFwRWxlbWVudC5zZWxlY3QoJ3N2ZycpO1xuICAgIGNvbnN0IHZpZXdwb2ludEVsZW1lbnQgPSBtaW5pbWFwU3ZnRWxlbWVudC5zZWxlY3QoJ3JlY3QnKTtcbiAgICB0aGlzLmNhbnZhcyA9IG1pbmltYXBFbGVtZW50LnNlbGVjdCgnY2FudmFzLnZpZXdwb3J0Jykubm9kZSgpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgaGFuZGxlRXZlbnQgPSAoZXZlbnQ6IE56U2FmZUFueSk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbWluaW1hcE9mZnNldCA9IHRoaXMubWluaW1hcE9mZnNldCgpO1xuICAgICAgY29uc3Qgd2lkdGggPSBOdW1iZXIodmlld3BvaW50RWxlbWVudC5hdHRyKCd3aWR0aCcpKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcih2aWV3cG9pbnRFbGVtZW50LmF0dHIoJ2hlaWdodCcpKTtcbiAgICAgIGNvbnN0IGNsaWNrQ29vcmRzID0gcG9pbnRlcihldmVudCwgbWluaW1hcFN2Z0VsZW1lbnQubm9kZSgpIGFzIE56U2FmZUFueSk7XG4gICAgICB0aGlzLnZpZXdwb2ludENvb3JkLnggPSBjbGlja0Nvb3Jkc1swXSAtIHdpZHRoIC8gMiAtIG1pbmltYXBPZmZzZXQueDtcbiAgICAgIHRoaXMudmlld3BvaW50Q29vcmQueSA9IGNsaWNrQ29vcmRzWzFdIC0gaGVpZ2h0IC8gMiAtIG1pbmltYXBPZmZzZXQueTtcbiAgICAgIHRoaXMudXBkYXRlVmlld3BvaW50KCk7XG4gICAgfTtcbiAgICB0aGlzLnZpZXdwb2ludENvb3JkID0geyB4OiAwLCB5OiAwIH07XG4gICAgY29uc3Qgc3ViamVjdCA9IGRyYWcoKS5zdWJqZWN0KE9iamVjdCk7XG4gICAgY29uc3QgZHJhZ0V2ZW50ID0gc3ViamVjdC5vbignZHJhZycsIGhhbmRsZUV2ZW50KTtcbiAgICB2aWV3cG9pbnRFbGVtZW50LmRhdHVtKHRoaXMudmlld3BvaW50Q29vcmQgYXMgTnpTYWZlQW55KS5jYWxsKGRyYWdFdmVudCBhcyBOelNhZmVBbnkpO1xuXG4gICAgLy8gTWFrZSB0aGUgbWluaW1hcCBjbGlja2FibGUuXG4gICAgbWluaW1hcFN2Z0VsZW1lbnQub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKChldmVudCBhcyBFdmVudCkuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAvLyBUaGlzIGNsaWNrIHdhcyBwYXJ0IG9mIGEgZHJhZyBldmVudCwgc28gc3VwcHJlc3MgaXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnVubGlzdGVuZXJzLnB1c2goKCkgPT4ge1xuICAgICAgc3ViamVjdC5vbignZHJhZycsIG51bGwpO1xuICAgICAgbWluaW1hcFN2Z0VsZW1lbnQub24oJ2NsaWNrJywgbnVsbCk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3cG9pbnQgPSB2aWV3cG9pbnRFbGVtZW50Lm5vZGUoKSBhcyBTVkdSZWN0RWxlbWVudDtcbiAgICB0aGlzLm1pbmltYXBTdmcgPSBtaW5pbWFwU3ZnRWxlbWVudC5ub2RlKCkgYXMgU1ZHU1ZHRWxlbWVudDtcbiAgICB0aGlzLmNhbnZhc0J1ZmZlciA9IG1pbmltYXBFbGVtZW50LnNlbGVjdCgnY2FudmFzLmJ1ZmZlcicpLm5vZGUoKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB3aGlsZSAodGhpcy51bmxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudW5saXN0ZW5lcnMucG9wKCkhKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtaW5pbWFwT2Zmc2V0KCk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6ICh0aGlzLmNhbnZhc1JlY3Qud2lkdGggLSB0aGlzLm1pbmltYXBTaXplLndpZHRoKSAvIDIsXG4gICAgICB5OiAodGhpcy5jYW52YXNSZWN0LmhlaWdodCAtIHRoaXMubWluaW1hcFNpemUuaGVpZ2h0KSAvIDJcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWaWV3cG9pbnQoKTogdm9pZCB7XG4gICAgLy8gVXBkYXRlIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgdmlld3BvaW50IHJlY3RhbmdsZS5cbiAgICBzZWxlY3QodGhpcy52aWV3cG9pbnQpLmF0dHIoJ3gnLCB0aGlzLnZpZXdwb2ludENvb3JkLngpLmF0dHIoJ3knLCB0aGlzLnZpZXdwb2ludENvb3JkLnkpO1xuICAgIC8vIFVwZGF0ZSB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIG9mIHRoZSBtYWluIHN2ZyB0byByZWZsZWN0IHRoZVxuICAgIC8vIG5ldyB2aWV3cG9pbnQuXG4gICAgY29uc3QgbWFpblggPSAoLXRoaXMudmlld3BvaW50Q29vcmQueCAqIHRoaXMuc2NhbGVNYWluKSAvIHRoaXMuc2NhbGVNaW5pbWFwO1xuICAgIGNvbnN0IG1haW5ZID0gKC10aGlzLnZpZXdwb2ludENvb3JkLnkgKiB0aGlzLnNjYWxlTWFpbikgLyB0aGlzLnNjYWxlTWluaW1hcDtcbiAgICBzZWxlY3QodGhpcy5zdmcpLmNhbGwodGhpcy5tYWluWm9vbS50cmFuc2Zvcm0sIHpvb21JZGVudGl0eS50cmFuc2xhdGUobWFpblgsIG1haW5ZKS5zY2FsZSh0aGlzLnNjYWxlTWFpbikpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzY2VuZVNpemUgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgdGhlIHNpemUgb2YgdGhlIGVudGlyZSBzY2VuZS5cbiAgICAgIHNjZW5lU2l6ZSA9IHRoaXMuem9vbUcuZ2V0QkJveCgpO1xuICAgICAgaWYgKHNjZW5lU2l6ZS53aWR0aCA9PT0gMCkge1xuICAgICAgICAvLyBUaGVyZSBpcyBubyBzY2VuZSBhbnltb3JlLiBXZSBoYXZlIGJlZW4gZGV0YWNoZWQgZnJvbSB0aGUgZG9tLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gRmlyZWZveCBwcm9kdWNlZCBOU19FUlJPUl9GQUlMVVJFIGlmIHdlIGhhdmUgYmVlblxuICAgICAgLy8gZGV0YWNoZWQgZnJvbSB0aGUgZG9tLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN2Z1NlbGVjdGlvbiA9IHNlbGVjdCh0aGlzLnN2Zyk7XG4gICAgLy8gUmVhZCBhbGwgdGhlIHN0eWxlIHJ1bGVzIGluIHRoZSBkb2N1bWVudCBhbmQgZW1iZWQgdGhlbSBpbnRvIHRoZSBzdmcuXG4gICAgLy8gVGhlIHN2ZyBuZWVkcyB0byBiZSBzZWxmIGNvbnRhaW5lZCwgaS5lLiBhbGwgdGhlIHN0eWxlIHJ1bGVzIG5lZWQgdG8gYmVcbiAgICAvLyBlbWJlZGRlZCBzbyB0aGUgY2FudmFzIG91dHB1dCBtYXRjaGVzIHRoZSBvcmlnaW4uXG4gICAgbGV0IHN0eWxlc1RleHQgPSAnJztcblxuICAgIGZvciAoY29uc3QgayBvZiBuZXcgQXJyYXkoZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoKS5rZXlzKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNzc1J1bGVzID1cbiAgICAgICAgICAoZG9jdW1lbnQuc3R5bGVTaGVldHNba10gYXMgTnpTYWZlQW55KS5jc3NSdWxlcyB8fCAoZG9jdW1lbnQuc3R5bGVTaGVldHNba10gYXMgTnpTYWZlQW55KS5ydWxlcztcbiAgICAgICAgaWYgKGNzc1J1bGVzID09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgbmV3IEFycmF5KGNzc1J1bGVzLmxlbmd0aCkua2V5cygpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRmLSogc2VsZWN0b3JzIGZyb20gdGhlIHN0eWxlcy5cbiAgICAgICAgICBzdHlsZXNUZXh0ICs9IGAke2Nzc1J1bGVzW2ldLmNzc1RleHQucmVwbGFjZSgvID90Zi1bXFx3LV0rID8vZywgJycpfVxcbmA7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGU6IE56U2FmZUFueSkge1xuICAgICAgICBpZiAoZS5uYW1lICE9PSAnU2VjdXJpdHlFcnJvcicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGVtcG9yYXJpbHkgYWRkIHRoZSBjc3MgcnVsZXMgdG8gdGhlIG1haW4gc3ZnLlxuICAgIGNvbnN0IHN2Z1N0eWxlID0gc3ZnU2VsZWN0aW9uLmFwcGVuZCgnc3R5bGUnKTtcbiAgICBzdmdTdHlsZS50ZXh0KHN0eWxlc1RleHQpO1xuXG4gICAgLy8gVGVtcG9yYXJpbHkgcmVtb3ZlIHRoZSB6b29tL3BhbiB0cmFuc2Zvcm0gZnJvbSB0aGUgbWFpbiBzdmcgc2luY2Ugd2VcbiAgICAvLyB3YW50IHRoZSBtaW5pbWFwIHRvIHNob3cgYSB6b29tZWQtb3V0IGFuZCBjZW50ZXJlZCB2aWV3LlxuICAgIGNvbnN0IHpvb21HU2VsZWN0aW9uID0gc2VsZWN0KHRoaXMuem9vbUcpO1xuICAgIGNvbnN0IHpvb21UcmFuc2Zvcm0gPSB6b29tR1NlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nKTtcbiAgICB6b29tR1NlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nLCBudWxsKTtcblxuICAgIC8vIFNpbmNlIHdlIGFkZCBwYWRkaW5nLCBhY2NvdW50IGZvciB0aGF0IGhlcmUuXG4gICAgc2NlbmVTaXplLmhlaWdodCArPSB0aGlzLmxhYmVsUGFkZGluZyAqIDI7XG4gICAgc2NlbmVTaXplLndpZHRoICs9IHRoaXMubGFiZWxQYWRkaW5nICogMjtcblxuICAgIC8vIFRlbXBvcmFyaWx5IGFzc2lnbiBhbiBleHBsaWNpdCB3aWR0aC9oZWlnaHQgdG8gdGhlIG1haW4gc3ZnLCBzaW5jZVxuICAgIC8vIGl0IGRvZXNuJ3QgaGF2ZSBvbmUgKHVzZXMgZmxleC1ib3gpLCBidXQgd2UgbmVlZCBpdCBmb3IgdGhlIGNhbnZhc1xuICAgIC8vIHRvIHdvcmsuXG4gICAgc3ZnU2VsZWN0aW9uLmF0dHIoJ3dpZHRoJywgc2NlbmVTaXplLndpZHRoKS5hdHRyKCdoZWlnaHQnLCBzY2VuZVNpemUuaGVpZ2h0KTtcblxuICAgIC8vIFNpbmNlIHRoZSBjb250ZW50IGluc2lkZSB0aGUgc3ZnIGNoYW5nZWQgKGUuZy4gYSBub2RlIHdhcyBleHBhbmRlZCksXG4gICAgLy8gdGhlIGFzcGVjdCByYXRpbyBoYXZlIGFsc28gY2hhbmdlZC4gVGh1cywgd2UgbmVlZCB0byB1cGRhdGUgdGhlIHNjYWxlXG4gICAgLy8gZmFjdG9yIG9mIHRoZSBtaW5pbWFwLiBUaGUgc2NhbGUgZmFjdG9yIGlzIGRldGVybWluZWQgc3VjaCB0aGF0IGJvdGhcbiAgICAvLyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgbWluaW1hcCBhcmUgPD0gbWF4aW11bSBzcGVjaWZpZWQgdy9oLlxuICAgIHRoaXMuc2NhbGVNaW5pbWFwID0gdGhpcy5tYXhXaWR0aCAvIE1hdGgubWF4KHNjZW5lU2l6ZS53aWR0aCwgc2NlbmVTaXplLmhlaWdodCk7XG4gICAgdGhpcy5taW5pbWFwU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBzY2VuZVNpemUud2lkdGggKiB0aGlzLnNjYWxlTWluaW1hcCxcbiAgICAgIGhlaWdodDogc2NlbmVTaXplLmhlaWdodCAqIHRoaXMuc2NhbGVNaW5pbWFwXG4gICAgfTtcblxuICAgIGNvbnN0IG1pbmltYXBPZmZzZXQgPSB0aGlzLm1pbmltYXBPZmZzZXQoKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgbWluaW1hcCdzIHN2ZywgdGhlIGJ1ZmZlciBjYW52YXMgYW5kIHRoZVxuICAgIC8vIHZpZXdwb2ludCByZWN0LlxuICAgIHNlbGVjdCh0aGlzLm1pbmltYXBTdmcpLmF0dHIodGhpcy5taW5pbWFwU2l6ZSBhcyBOelNhZmVBbnkpO1xuICAgIHNlbGVjdCh0aGlzLmNhbnZhc0J1ZmZlcikuYXR0cih0aGlzLm1pbmltYXBTaXplIGFzIE56U2FmZUFueSk7XG5cbiAgICBpZiAodGhpcy50cmFuc2xhdGUgIT0gbnVsbCAmJiB0aGlzLnpvb20gIT0gbnVsbCkge1xuICAgICAgLy8gVXBkYXRlIHRoZSB2aWV3cG9pbnQgcmVjdGFuZ2xlIHNoYXBlIHNpbmNlIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlXG4gICAgICAvLyBtYXAgaGFzIGNoYW5nZWQuXG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiByZXFBbmltRnJhbWUoKCkgPT4gdGhpcy56b29tKCkpKTtcbiAgICB9XG5cbiAgICAvLyBTZXJpYWxpemUgdGhlIG1haW4gc3ZnIHRvIGEgc3RyaW5nIHdoaWNoIHdpbGwgYmUgdXNlZCBhcyB0aGUgcmVuZGVyaW5nXG4gICAgLy8gY29udGVudCBmb3IgdGhlIGNhbnZhcy5cbiAgICBjb25zdCBzdmdYbWwgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuc3ZnKTtcblxuICAgIC8vIE5vdyB0aGF0IHRoZSBzdmcgaXMgc2VyaWFsaXplZCBmb3IgcmVuZGVyaW5nLCByZW1vdmUgdGhlIHRlbXBvcmFyaWx5XG4gICAgLy8gYXNzaWduZWQgc3R5bGVzLCBleHBsaWNpdCB3aWR0aCBhbmQgaGVpZ2h0IGFuZCBicmluZyBiYWNrIHRoZSBwYW4vem9vbVxuICAgIC8vIHRyYW5zZm9ybS5cbiAgICBzdmdTdHlsZS5yZW1vdmUoKTtcbiAgICBzdmdTZWxlY3Rpb24uYXR0cignd2lkdGgnLCAnMTAwJScpLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICB6b29tR1NlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nLCB6b29tVHJhbnNmb3JtKTtcblxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY29uc3Qgb25Mb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8gRHJhdyB0aGUgc3ZnIGNvbnRlbnQgb250byB0aGUgYnVmZmVyIGNhbnZhcy5cbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhc0J1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY29udGV4dCEuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzQnVmZmVyLndpZHRoLCB0aGlzLmNhbnZhc0J1ZmZlci5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0IS5kcmF3SW1hZ2UoaW1hZ2UsIG1pbmltYXBPZmZzZXQueCwgbWluaW1hcE9mZnNldC55LCB0aGlzLm1pbmltYXBTaXplLndpZHRoLCB0aGlzLm1pbmltYXBTaXplLmhlaWdodCk7XG5cbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmVxQW5pbUZyYW1lKCgpID0+IHtcbiAgICAgICAgICAvLyBIaWRlIHRoZSBvbGQgY2FudmFzIGFuZCBzaG93IHRoZSBuZXcgYnVmZmVyIGNhbnZhcy5cbiAgICAgICAgICBzZWxlY3QodGhpcy5jYW52YXNCdWZmZXIpLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgc2VsZWN0KHRoaXMuY2FudmFzKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgLy8gU3dhcCB0aGUgdHdvIGNhbnZhc2VzLlxuICAgICAgICAgIFt0aGlzLmNhbnZhcywgdGhpcy5jYW52YXNCdWZmZXJdID0gW3RoaXMuY2FudmFzQnVmZmVyLCB0aGlzLmNhbnZhc107XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgIGltYWdlLnNyYyA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwke2VuY29kZVVSSUNvbXBvbmVudChzdmdYbWwpfWA7XG5cbiAgICB0aGlzLnVubGlzdGVuZXJzLnB1c2goKCkgPT4ge1xuICAgICAgaW1hZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBjaGFuZ2VzIGluIHpvb21pbmcvcGFubmluZy4gU2hvdWxkIGJlIGNhbGxlZCBmcm9tIHRoZSBtYWluIHN2Z1xuICAgKiB0byBub3RpZnkgdGhhdCBhIHpvb20vcGFuIHdhcyBwZXJmb3JtZWQgYW5kIHRoaXMgbWluaW1hcCB3aWxsIHVwZGF0ZSBpdCdzXG4gICAqIHZpZXdwb2ludCByZWN0YW5nbGUuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFuc2Zvcm1cbiAgICovXG4gIHpvb20odHJhbnNmb3JtPzogWm9vbVRyYW5zZm9ybSB8IE56Wm9vbVRyYW5zZm9ybSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjYWxlTWluaW1hcCA9PSBudWxsKSB7XG4gICAgICAvLyBTY2VuZSBpcyBub3QgcmVhZHkgeWV0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIG5ldyB0cmFuc2xhdGUgYW5kIHNjYWxlIHBhcmFtcywgb25seSBpZiBzcGVjaWZpZWQuXG4gICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgdGhpcy50cmFuc2xhdGUgPSBbdHJhbnNmb3JtLngsIHRyYW5zZm9ybS55XTtcbiAgICAgIHRoaXMuc2NhbGVNYWluID0gdHJhbnNmb3JtLms7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBsb2NhdGlvbiBvZiB0aGUgdmlld3BvaW50IHJlY3RhbmdsZS5cbiAgICBjb25zdCBzdmdSZWN0ID0gdGhpcy5zdmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgbWluaW1hcE9mZnNldCA9IHRoaXMubWluaW1hcE9mZnNldCgpO1xuICAgIGNvbnN0IHZpZXdwb2ludFNlbGVjdGlvbiA9IHNlbGVjdCh0aGlzLnZpZXdwb2ludCk7XG4gICAgdGhpcy52aWV3cG9pbnRDb29yZC54ID0gKC10aGlzLnRyYW5zbGF0ZVswXSAqIHRoaXMuc2NhbGVNaW5pbWFwKSAvIHRoaXMuc2NhbGVNYWluO1xuICAgIHRoaXMudmlld3BvaW50Q29vcmQueSA9ICgtdGhpcy50cmFuc2xhdGVbMV0gKiB0aGlzLnNjYWxlTWluaW1hcCkgLyB0aGlzLnNjYWxlTWFpbjtcbiAgICBjb25zdCB2aWV3cG9pbnRXaWR0aCA9IChzdmdSZWN0LndpZHRoICogdGhpcy5zY2FsZU1pbmltYXApIC8gdGhpcy5zY2FsZU1haW47XG4gICAgY29uc3Qgdmlld3BvaW50SGVpZ2h0ID0gKHN2Z1JlY3QuaGVpZ2h0ICogdGhpcy5zY2FsZU1pbmltYXApIC8gdGhpcy5zY2FsZU1haW47XG4gICAgdmlld3BvaW50U2VsZWN0aW9uXG4gICAgICAuYXR0cigneCcsIHRoaXMudmlld3BvaW50Q29vcmQueCArIG1pbmltYXBPZmZzZXQueClcbiAgICAgIC5hdHRyKCd5JywgdGhpcy52aWV3cG9pbnRDb29yZC55ICsgbWluaW1hcE9mZnNldC55KVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdmlld3BvaW50V2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgdmlld3BvaW50SGVpZ2h0KTtcbiAgICAvLyBTaG93L2hpZGUgdGhlIG1pbmltYXAgZGVwZW5kaW5nIG9uIHRoZSB2aWV3cG9pbnQgYXJlYSBhcyBmcmFjdGlvbiBvZiB0aGVcbiAgICAvLyB3aG9sZSBtaW5pbWFwLlxuICAgIGNvbnN0IG1hcFdpZHRoID0gdGhpcy5taW5pbWFwU2l6ZS53aWR0aDtcbiAgICBjb25zdCBtYXBIZWlnaHQgPSB0aGlzLm1pbmltYXBTaXplLmhlaWdodDtcbiAgICBjb25zdCB4ID0gdGhpcy52aWV3cG9pbnRDb29yZC54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnZpZXdwb2ludENvb3JkLnk7XG4gICAgY29uc3QgdyA9IE1hdGgubWluKE1hdGgubWF4KDAsIHggKyB2aWV3cG9pbnRXaWR0aCksIG1hcFdpZHRoKSAtIE1hdGgubWluKE1hdGgubWF4KDAsIHgpLCBtYXBXaWR0aCk7XG4gICAgY29uc3QgaCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHkgKyB2aWV3cG9pbnRIZWlnaHQpLCBtYXBIZWlnaHQpIC0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSksIG1hcEhlaWdodCk7XG4gICAgY29uc3QgZnJhY0ludGVyc2VjdCA9ICh3ICogaCkgLyAobWFwV2lkdGggKiBtYXBIZWlnaHQpO1xuICAgIGlmIChmcmFjSW50ZXJzZWN0IDwgRlJBQ19WSUVXUE9JTlRfQVJFQSkge1xuICAgICAgdGhpcy5taW5pbWFwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbmltYXAuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICB9XG59XG4iXX0=