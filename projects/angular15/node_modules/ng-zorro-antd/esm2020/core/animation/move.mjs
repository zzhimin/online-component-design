/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { AnimationDuration } from './animation-consts';
export const moveUpMotion = trigger('moveUpMotion', [
    transition('* => enter', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate(`${AnimationDuration.BASE}`, style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }))
    ]),
    transition('* => leave', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }),
        animate(`${AnimationDuration.BASE}`, style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }))
    ])
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9hbmltYXRpb24vbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXZELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBNkIsT0FBTyxDQUFDLGNBQWMsRUFBRTtJQUM1RSxVQUFVLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLEtBQUssQ0FBQztZQUNKLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFNBQVMsRUFBRSxtQkFBbUI7WUFDOUIsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBQ0YsT0FBTyxDQUNMLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQzNCLEtBQUssQ0FBQztZQUNKLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQ0g7S0FDRixDQUFDO0lBQ0YsVUFBVSxDQUFDLFlBQVksRUFBRTtRQUN2QixLQUFLLENBQUM7WUFDSixlQUFlLEVBQUUsS0FBSztZQUN0QixTQUFTLEVBQUUsZ0JBQWdCO1lBQzNCLE9BQU8sRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUNGLE9BQU8sQ0FDTCxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUMzQixLQUFLLENBQUM7WUFDSixlQUFlLEVBQUUsS0FBSztZQUN0QixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUNIO0tBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgQW5pbWF0aW9uRHVyYXRpb24gfSBmcm9tICcuL2FuaW1hdGlvbi1jb25zdHMnO1xuXG5leHBvcnQgY29uc3QgbW92ZVVwTW90aW9uOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSB0cmlnZ2VyKCdtb3ZlVXBNb3Rpb24nLCBbXG4gIHRyYW5zaXRpb24oJyogPT4gZW50ZXInLCBbXG4gICAgc3R5bGUoe1xuICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCAwJyxcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICAgIG9wYWNpdHk6IDBcbiAgICB9KSxcbiAgICBhbmltYXRlKFxuICAgICAgYCR7QW5pbWF0aW9uRHVyYXRpb24uQkFTRX1gLFxuICAgICAgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDAlKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH0pXG4gICAgKVxuICBdKSxcbiAgdHJhbnNpdGlvbignKiA9PiBsZWF2ZScsIFtcbiAgICBzdHlsZSh7XG4gICAgICB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnLFxuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwJSknLFxuICAgICAgb3BhY2l0eTogMVxuICAgIH0pLFxuICAgIGFuaW1hdGUoXG4gICAgICBgJHtBbmltYXRpb25EdXJhdGlvbi5CQVNFfWAsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAgMCcsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSlcbiAgICApXG4gIF0pXG5dKTtcbiJdfQ==