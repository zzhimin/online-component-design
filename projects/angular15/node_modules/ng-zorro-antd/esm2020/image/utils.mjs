/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * fit content details: https://github.com/NG-ZORRO/ng-zorro-antd/pull/6154#issuecomment-745025554
 *
 * calc position x,y point
 *
 * CASE (width <= clientWidth && height <= clientHeight):
 *
 * ------------- clientWidth -------------
 * |                                     |
 * |        ------ width ------          |
 * |        |                 |          |
 * |        |                 |          |
 * client   height            |          |
 * Height   |                 |          |
 * |        |                 |          |
 * |        -------------------          |
 * |                                     |
 * |                                     |
 * ---------------------------------------
 * fixedPosition = { x: 0, y: 0 }
 *
 *
 *
 * CASE (width > clientWidth || height > clientHeight):
 *
 * ------------- clientWidth -------------
 * |        |                            |
 * |        top                          |
 * |        |                            |
 * |--left--|--------------- width -----------------
 * |        |                                      |
 * client   |                                      |
 * Height   |                                      |
 * |        |                                      |
 * |        |                                      |
 * |        height                                 |
 * |        |                                      |
 * ---------|                                      |
 *          |                                      |
 *          |                                      |
 *          |                                      |
 *          ----------------------------------------
 *
 *
 * - left || top > 0
 *   left -> 0 || top -> 0
 *
 * - (left + width) < clientWidth || (top + height) < clientHeight
 * - left | top + width | height < clientWidth | clientHeight -> Back left | top + width | height === clientWidth | clientHeight
 *
 * DEFAULT:
 * - hold position
 *
 */
export function getFitContentPosition(params) {
    let fixPos = {};
    if (params.width <= params.clientWidth && params.height <= params.clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    }
    if (params.width > params.clientWidth || params.height > params.clientHeight) {
        fixPos = {
            x: fitPoint(params.left, params.width, params.clientWidth),
            y: fitPoint(params.top, params.height, params.clientHeight)
        };
    }
    return fixPos;
}
export function getOffset(node) {
    const box = node.getBoundingClientRect();
    const docElem = document.documentElement;
    // use docElem.scrollLeft to support IE
    return {
        left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
        top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
    };
}
export function getClientSize() {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height
    };
}
function fitPoint(start, size, clientSize) {
    const startAddSize = start + size;
    const offsetStart = (size - clientSize) / 2;
    let distance = null;
    if (size > clientSize) {
        if (start > 0) {
            distance = offsetStart;
        }
        if (start < 0 && startAddSize < clientSize) {
            distance = -offsetStart;
        }
    }
    else {
        if (start < 0 || startAddSize > clientSize) {
            distance = start < 0 ? offsetStart : -offsetStart;
        }
    }
    return distance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ltYWdlL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxNQU9yQztJQUNDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVoQixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDOUUsTUFBTSxHQUFHO1lBQ1AsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7S0FDSDtJQUVELElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUM1RSxNQUFNLEdBQUc7WUFDUCxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzFELENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDNUQsQ0FBQztLQUNIO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBaUI7SUFDekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDekMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUV6Qyx1Q0FBdUM7SUFDdkMsT0FBTztRQUNMLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUNuSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7S0FDL0csQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYTtJQUMzQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztJQUNuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO0lBQzNFLE9BQU87UUFDTCxLQUFLO1FBQ0wsTUFBTTtLQUNQLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsS0FBYSxFQUFFLElBQVksRUFBRSxVQUFrQjtJQUMvRCxNQUFNLFlBQVksR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBRW5DLElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRTtRQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixRQUFRLEdBQUcsV0FBVyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLFlBQVksR0FBRyxVQUFVLEVBQUU7WUFDMUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3pCO0tBQ0Y7U0FBTTtRQUNMLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxZQUFZLEdBQUcsVUFBVSxFQUFFO1lBQzFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ25EO0tBQ0Y7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBmaXQgY29udGVudCBkZXRhaWxzOiBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9wdWxsLzYxNTQjaXNzdWVjb21tZW50LTc0NTAyNTU1NFxuICpcbiAqIGNhbGMgcG9zaXRpb24geCx5IHBvaW50XG4gKlxuICogQ0FTRSAod2lkdGggPD0gY2xpZW50V2lkdGggJiYgaGVpZ2h0IDw9IGNsaWVudEhlaWdodCk6XG4gKlxuICogLS0tLS0tLS0tLS0tLSBjbGllbnRXaWR0aCAtLS0tLS0tLS0tLS0tXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgIC0tLS0tLSB3aWR0aCAtLS0tLS0gICAgICAgICAgfFxuICogfCAgICAgICAgfCAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8XG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHxcbiAqIGNsaWVudCAgIGhlaWdodCAgICAgICAgICAgIHwgICAgICAgICAgfFxuICogSGVpZ2h0ICAgfCAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8XG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHxcbiAqIHwgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0gICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogZml4ZWRQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9XG4gKlxuICpcbiAqXG4gKiBDQVNFICh3aWR0aCA+IGNsaWVudFdpZHRoIHx8IGhlaWdodCA+IGNsaWVudEhlaWdodCk6XG4gKlxuICogLS0tLS0tLS0tLS0tLSBjbGllbnRXaWR0aCAtLS0tLS0tLS0tLS0tXG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgIHRvcCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS1sZWZ0LS18LS0tLS0tLS0tLS0tLS0tIHdpZHRoIC0tLS0tLS0tLS0tLS0tLS0tXG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiBjbGllbnQgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiBIZWlnaHQgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICBoZWlnaHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAtLS0tLS0tLS18ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICpcbiAqIC0gbGVmdCB8fCB0b3AgPiAwXG4gKiAgIGxlZnQgLT4gMCB8fCB0b3AgLT4gMFxuICpcbiAqIC0gKGxlZnQgKyB3aWR0aCkgPCBjbGllbnRXaWR0aCB8fCAodG9wICsgaGVpZ2h0KSA8IGNsaWVudEhlaWdodFxuICogLSBsZWZ0IHwgdG9wICsgd2lkdGggfCBoZWlnaHQgPCBjbGllbnRXaWR0aCB8IGNsaWVudEhlaWdodCAtPiBCYWNrIGxlZnQgfCB0b3AgKyB3aWR0aCB8IGhlaWdodCA9PT0gY2xpZW50V2lkdGggfCBjbGllbnRIZWlnaHRcbiAqXG4gKiBERUZBVUxUOlxuICogLSBob2xkIHBvc2l0aW9uXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rml0Q29udGVudFBvc2l0aW9uKHBhcmFtczoge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICB0b3A6IG51bWJlcjtcbiAgY2xpZW50V2lkdGg6IG51bWJlcjtcbiAgY2xpZW50SGVpZ2h0OiBudW1iZXI7XG59KTogeyB4PzogbnVtYmVyOyB5PzogbnVtYmVyIH0ge1xuICBsZXQgZml4UG9zID0ge307XG5cbiAgaWYgKHBhcmFtcy53aWR0aCA8PSBwYXJhbXMuY2xpZW50V2lkdGggJiYgcGFyYW1zLmhlaWdodCA8PSBwYXJhbXMuY2xpZW50SGVpZ2h0KSB7XG4gICAgZml4UG9zID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgaWYgKHBhcmFtcy53aWR0aCA+IHBhcmFtcy5jbGllbnRXaWR0aCB8fCBwYXJhbXMuaGVpZ2h0ID4gcGFyYW1zLmNsaWVudEhlaWdodCkge1xuICAgIGZpeFBvcyA9IHtcbiAgICAgIHg6IGZpdFBvaW50KHBhcmFtcy5sZWZ0LCBwYXJhbXMud2lkdGgsIHBhcmFtcy5jbGllbnRXaWR0aCksXG4gICAgICB5OiBmaXRQb2ludChwYXJhbXMudG9wLCBwYXJhbXMuaGVpZ2h0LCBwYXJhbXMuY2xpZW50SGVpZ2h0KVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZml4UG9zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2Zmc2V0KG5vZGU6IEhUTUxFbGVtZW50KTogeyBsZWZ0OiBudW1iZXI7IHRvcDogbnVtYmVyIH0ge1xuICBjb25zdCBib3ggPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gIC8vIHVzZSBkb2NFbGVtLnNjcm9sbExlZnQgdG8gc3VwcG9ydCBJRVxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGJveC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbExlZnQpIC0gKGRvY0VsZW0uY2xpZW50TGVmdCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudExlZnQgfHwgMCksXG4gICAgdG9wOiBib3gudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcCkgLSAoZG9jRWxlbS5jbGllbnRUb3AgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRUb3AgfHwgMClcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsaWVudFNpemUoKTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9IHtcbiAgY29uc3Qgd2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9O1xufVxuXG5mdW5jdGlvbiBmaXRQb2ludChzdGFydDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGNsaWVudFNpemU6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuICBjb25zdCBzdGFydEFkZFNpemUgPSBzdGFydCArIHNpemU7XG4gIGNvbnN0IG9mZnNldFN0YXJ0ID0gKHNpemUgLSBjbGllbnRTaXplKSAvIDI7XG4gIGxldCBkaXN0YW5jZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgaWYgKHNpemUgPiBjbGllbnRTaXplKSB7XG4gICAgaWYgKHN0YXJ0ID4gMCkge1xuICAgICAgZGlzdGFuY2UgPSBvZmZzZXRTdGFydDtcbiAgICB9XG4gICAgaWYgKHN0YXJ0IDwgMCAmJiBzdGFydEFkZFNpemUgPCBjbGllbnRTaXplKSB7XG4gICAgICBkaXN0YW5jZSA9IC1vZmZzZXRTdGFydDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydEFkZFNpemUgPiBjbGllbnRTaXplKSB7XG4gICAgICBkaXN0YW5jZSA9IHN0YXJ0IDwgMCA/IG9mZnNldFN0YXJ0IDogLW9mZnNldFN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkaXN0YW5jZTtcbn1cbiJdfQ==