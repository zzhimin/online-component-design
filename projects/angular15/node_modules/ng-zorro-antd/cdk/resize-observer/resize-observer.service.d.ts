import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
export declare class NzResizeObserverFactory {
    create(callback: ResizeObserverCallback): ResizeObserver | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizeObserverFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzResizeObserverFactory>;
}
/** An injectable service that allows watching elements for changes to their content. */
export declare class NzResizeObserver implements OnDestroy {
    private nzResizeObserverFactory;
    /** Keeps track of the existing ResizeObservers so they can be reused. */
    private observedElements;
    constructor(nzResizeObserverFactory: NzResizeObserverFactory);
    ngOnDestroy(): void;
    observe(elementOrRef: Element | ElementRef<Element>): Observable<ResizeObserverEntry[]>;
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     */
    private observeElement;
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     */
    private unobserveElement;
    /** Clean up the underlying ResizeObserver for the specified element. */
    private cleanupObserver;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizeObserver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzResizeObserver>;
}
