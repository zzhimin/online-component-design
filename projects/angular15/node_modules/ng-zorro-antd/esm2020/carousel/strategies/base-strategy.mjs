/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export class NzCarouselBaseStrategy {
    constructor(carouselComponent, cdr, renderer, platform, options) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.platform = platform;
        this.options = options;
        this.carouselComponent = carouselComponent;
    }
    get maxIndex() {
        return this.length - 1;
    }
    get firstEl() {
        return this.contents[0].el;
    }
    get lastEl() {
        return this.contents[this.maxIndex].el;
    }
    /**
     * Initialize dragging sequences.
     *
     * @param contents
     */
    withCarouselContents(contents) {
        const carousel = this.carouselComponent;
        this.slickListEl = carousel.slickListEl;
        this.slickTrackEl = carousel.slickTrackEl;
        this.contents = contents?.toArray() || [];
        this.length = this.contents.length;
        if (this.platform.isBrowser) {
            const rect = carousel.el.getBoundingClientRect();
            this.unitWidth = rect.width;
            this.unitHeight = rect.height;
        }
        else {
            // Since we cannot call getBoundingClientRect in server, we just hide all items except for the first one.
            contents?.forEach((content, index) => {
                if (index === 0) {
                    this.renderer.setStyle(content.el, 'width', '100%');
                }
                else {
                    this.renderer.setStyle(content.el, 'display', 'none');
                }
            });
        }
    }
    /**
     * When user drag the carousel component.
     *
     * @optional
     */
    dragging(_vector) { }
    /**
     * Destroy a scroll strategy.
     */
    dispose() { }
    getFromToInBoundary(f, t) {
        const length = this.maxIndex + 1;
        return { from: (f + length) % length, to: (t + length) % length };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvc3RyYXRlZ2llcy9iYXNlLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQVdILE1BQU0sT0FBZ0Isc0JBQXNCO0lBc0IxQyxZQUNFLGlCQUE4QyxFQUNwQyxHQUFzQixFQUN0QixRQUFtQixFQUNuQixRQUFrQixFQUNsQixPQUFXO1FBSFgsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQUk7UUFFckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQzdDLENBQUM7SUFwQkQsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQWMsT0FBTztRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFjLE1BQU07UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQVlEOzs7O09BSUc7SUFDSCxvQkFBb0IsQ0FBQyxRQUFzRDtRQUN6RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWtCLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQy9CO2FBQU07WUFDTCx5R0FBeUc7WUFDekcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNyRDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdkQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQU9EOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsT0FBc0IsSUFBUyxDQUFDO0lBRXpDOztPQUVHO0lBQ0gsT0FBTyxLQUFVLENBQUM7SUFFUixtQkFBbUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDcEUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwtY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRnJvbVRvSW50ZXJmYWNlLCBOekNhcm91c2VsQ29tcG9uZW50QXNTb3VyY2UsIFBvaW50ZXJWZWN0b3IgfSBmcm9tICcuLi90eXBpbmdzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE56Q2Fyb3VzZWxCYXNlU3RyYXRlZ3k8VCA9IE56U2FmZUFueT4ge1xuICAvLyBQcm9wZXJ0aWVzIHRoYXQgc3RyYXRlZ2llcyBtYXkgd2FudCB0byB1c2UuXG4gIHByb3RlY3RlZCBjYXJvdXNlbENvbXBvbmVudDogTnpDYXJvdXNlbENvbXBvbmVudEFzU291cmNlIHwgbnVsbDtcbiAgcHJvdGVjdGVkIGNvbnRlbnRzITogTnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmVbXTtcbiAgcHJvdGVjdGVkIHNsaWNrTGlzdEVsITogSFRNTEVsZW1lbnQ7XG4gIHByb3RlY3RlZCBzbGlja1RyYWNrRWwhOiBIVE1MRWxlbWVudDtcbiAgcHJvdGVjdGVkIGxlbmd0aCE6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHVuaXRXaWR0aCE6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHVuaXRIZWlnaHQhOiBudW1iZXI7XG5cbiAgcHJvdGVjdGVkIGdldCBtYXhJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGZpcnN0RWwoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzWzBdLmVsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBsYXN0RWwoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzW3RoaXMubWF4SW5kZXhdLmVsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2Fyb3VzZWxDb21wb25lbnQ6IE56Q2Fyb3VzZWxDb21wb25lbnRBc1NvdXJjZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByb3RlY3RlZCBvcHRpb25zPzogVFxuICApIHtcbiAgICB0aGlzLmNhcm91c2VsQ29tcG9uZW50ID0gY2Fyb3VzZWxDb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBkcmFnZ2luZyBzZXF1ZW5jZXMuXG4gICAqXG4gICAqIEBwYXJhbSBjb250ZW50c1xuICAgKi9cbiAgd2l0aENhcm91c2VsQ29udGVudHMoY29udGVudHM6IFF1ZXJ5TGlzdDxOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZT4gfCBudWxsKTogdm9pZCB7XG4gICAgY29uc3QgY2Fyb3VzZWwgPSB0aGlzLmNhcm91c2VsQ29tcG9uZW50ITtcbiAgICB0aGlzLnNsaWNrTGlzdEVsID0gY2Fyb3VzZWwuc2xpY2tMaXN0RWw7XG4gICAgdGhpcy5zbGlja1RyYWNrRWwgPSBjYXJvdXNlbC5zbGlja1RyYWNrRWw7XG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzPy50b0FycmF5KCkgfHwgW107XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmNvbnRlbnRzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgcmVjdCA9IGNhcm91c2VsLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy51bml0V2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgdGhpcy51bml0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNpbmNlIHdlIGNhbm5vdCBjYWxsIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpbiBzZXJ2ZXIsIHdlIGp1c3QgaGlkZSBhbGwgaXRlbXMgZXhjZXB0IGZvciB0aGUgZmlyc3Qgb25lLlxuICAgICAgY29udGVudHM/LmZvckVhY2goKGNvbnRlbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGVudC5lbCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgdHJhbnNpdGlvbi5cbiAgICovXG4gIGFic3RyYWN0IHN3aXRjaChfZjogbnVtYmVyLCBfdDogbnVtYmVyKTogT2JzZXJ2YWJsZTx2b2lkPjtcblxuICAvKipcbiAgICogV2hlbiB1c2VyIGRyYWcgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBkcmFnZ2luZyhfdmVjdG9yOiBQb2ludGVyVmVjdG9yKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGEgc2Nyb2xsIHN0cmF0ZWd5LlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkIHt9XG5cbiAgcHJvdGVjdGVkIGdldEZyb21Ub0luQm91bmRhcnkoZjogbnVtYmVyLCB0OiBudW1iZXIpOiBGcm9tVG9JbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubWF4SW5kZXggKyAxO1xuICAgIHJldHVybiB7IGZyb206IChmICsgbGVuZ3RoKSAlIGxlbmd0aCwgdG86ICh0ICsgbGVuZ3RoKSAlIGxlbmd0aCB9O1xuICB9XG59XG4iXX0=