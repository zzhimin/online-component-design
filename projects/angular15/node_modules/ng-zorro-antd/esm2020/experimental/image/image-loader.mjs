/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { isNil } from 'ng-zorro-antd/core/util';
import { normalizeSrc } from './utils';
export const defaultImageSrcLoader = ({ src }) => {
    return src;
};
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
export function createAliObjectsLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `?x-oss-process=image/resize,w_${width}`;
        return `${domain}/${normalizeSrc(src)}${params}`;
    };
}
/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
export function createImgixLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `&fit=max&w=${width}`;
        return `${domain}/${normalizeSrc(src)}?format=auto${params}`;
    };
}
/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
export function createCloudinaryLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `,w_${width}`;
        return `${domain}/c_limit,q_auto${params}/${normalizeSrc(src)}`;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9leHBlcmltZW50YWwvaW1hZ2UvaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUdoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFxQixDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqRSxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxNQUFjO0lBQ25ELE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsS0FBSyxFQUFFLENBQUM7UUFDNUUsT0FBTyxHQUFHLE1BQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDbkQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEtBQUssRUFBRSxDQUFDO1FBQ3pELE9BQU8sR0FBRyxNQUFNLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLE1BQU0sRUFBRSxDQUFDO0lBQy9ELENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsTUFBYztJQUNuRCxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUN4QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUNqRCxPQUFPLEdBQUcsTUFBTSxrQkFBa0IsTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQ2xFLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpJbWFnZVNyY0xvYWRlciB9IGZyb20gJy4vdHlwaW5ncyc7XG5pbXBvcnQgeyBub3JtYWxpemVTcmMgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRJbWFnZVNyY0xvYWRlcjogTnpJbWFnZVNyY0xvYWRlciA9ICh7IHNyYyB9KSA9PiB7XG4gIHJldHVybiBzcmM7XG59O1xuXG4vKipcbiAqIEFsaU9iamVjdHNMb2FkZXIgcmV0dXJuIGZvcm1hdFxuICoge2RvbWFpbn0ve3NyY30/eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd197d2lkdGh9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbGlPYmplY3RzTG9hZGVyKGRvbWFpbjogc3RyaW5nKTogTnpJbWFnZVNyY0xvYWRlciB7XG4gIHJldHVybiAoeyBzcmMsIHdpZHRoIH0pID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBpc05pbCh3aWR0aCkgPyAnJyA6IGA/eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18ke3dpZHRofWA7XG4gICAgcmV0dXJuIGAke2RvbWFpbn0vJHtub3JtYWxpemVTcmMoc3JjKX0ke3BhcmFtc31gO1xuICB9O1xufVxuXG4vKipcbiAqIEltZ2l4TG9hZGVyIHJldHVybiBmb3JtYXRcbiAqIHtkb21haW59L3tzcmN9P2Zvcm1hdD1hdXRvJmZpdD1tYXgmdz17d2lkdGh9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbWdpeExvYWRlcihkb21haW46IHN0cmluZyk6IE56SW1hZ2VTcmNMb2FkZXIge1xuICByZXR1cm4gKHsgc3JjLCB3aWR0aCB9KSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gaXNOaWwod2lkdGgpID8gJycgOiBgJmZpdD1tYXgmdz0ke3dpZHRofWA7XG4gICAgcmV0dXJuIGAke2RvbWFpbn0vJHtub3JtYWxpemVTcmMoc3JjKX0/Zm9ybWF0PWF1dG8ke3BhcmFtc31gO1xuICB9O1xufVxuXG4vKipcbiAqIENsb3VkaW5hcnlMb2FkZXIgcmV0dXJuIGZvcm1hdFxuICoge2RvbWFpbn0vY19saW1pdCxxX2F1dG8sd197d2lkdGh9L3tzcmN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDbG91ZGluYXJ5TG9hZGVyKGRvbWFpbjogc3RyaW5nKTogTnpJbWFnZVNyY0xvYWRlciB7XG4gIHJldHVybiAoeyBzcmMsIHdpZHRoIH0pID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBpc05pbCh3aWR0aCkgPyAnJyA6IGAsd18ke3dpZHRofWA7XG4gICAgcmV0dXJuIGAke2RvbWFpbn0vY19saW1pdCxxX2F1dG8ke3BhcmFtc30vJHtub3JtYWxpemVTcmMoc3JjKX1gO1xuICB9O1xufVxuIl19