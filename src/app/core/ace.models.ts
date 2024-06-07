import { Observable } from 'rxjs/internal/Observable';
import { forkJoin, from, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

let aceDependenciesLoaded = false;
let aceModule: any;

function loadAceDependencies(): Observable<any> {
  if (aceDependenciesLoaded) {
    return of(null);
  } else {
    const aceObservables: Observable<any>[] = [];
    aceObservables.push(from(import('ace-builds/src-noconflict/ext-language_tools')));
    aceObservables.push(from(import('ace-builds/src-noconflict/ext-searchbox')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/mode-java')));
    aceObservables.push(from(import('ace-builds/src-noconflict/mode-css')));
    aceObservables.push(from(import('ace-builds/src-noconflict/mode-json')));
    aceObservables.push(from(import('ace-builds/src-noconflict/mode-javascript')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/mode-text')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/mode-markdown')));
    aceObservables.push(from(import('ace-builds/src-noconflict/mode-html')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/mode-c_cpp')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/mode-protobuf')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/snippets/java')));
    aceObservables.push(from(import('ace-builds/src-noconflict/snippets/css')));
    aceObservables.push(from(import('ace-builds/src-noconflict/snippets/json')));
    aceObservables.push(from(import('ace-builds/src-noconflict/snippets/javascript')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/snippets/text')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/snippets/markdown')));
    aceObservables.push(from(import('ace-builds/src-noconflict/snippets/html')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/snippets/c_cpp')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/snippets/protobuf')));
    // aceObservables.push(from(import('ace-builds/src-noconflict/theme-textmate')));
    aceObservables.push(from(import('ace-builds/src-noconflict/theme-github')));
    return forkJoin(aceObservables).pipe(
      tap(() => {
        aceDependenciesLoaded = true;
      })
    );
  }
}

export function getAce(): Observable<any> {
  if (aceModule) {
    return of(aceModule);
  } else {
    // @ts-ignore
    return from(import('ace')).pipe(
      mergeMap((module) => {
        return loadAceDependencies().pipe(
         map(() => module)
        );
      }),
      tap((module) => {
        aceModule = module;
      })
    );
  }
}
