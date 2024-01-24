import type {
    Component,
    Context,
    GuillotineResponseJson,
    RecursivePartial,
} from '../../src/types';


import {
    afterEach as afterAllTestsInThisDescribe,
    beforeEach as beforeAllTestsInThisDescribe,
    describe,
    expect,
    jest,
    test as it
} from '@jest/globals';
import {
    CATCH_ALL,
    FRAGMENT_CONTENTTYPE_NAME,
    JSESSIONID_HEADER,
    PROJECT_ID_HEADER,
    RENDER_MODE,
    RENDER_MODE_HEADER,
    XP_BASE_URL_HEADER,
    XP_REQUEST_TYPE,
} from '../../src/constants';
import {ENONIC_APP_NAME} from '../constants';
// import {ws} from '../testUtils';


globalThis.console = {
    ...console,
    error: jest.fn(),
    // warn: jest.fn(),
    log: jest.fn(),
    info: jest.fn(),
    // debug: jest.fn(),
} as Console;


const OLD_ENV = process.env;


const GUILLOTINE_RESULT_MINIMAL: GuillotineResponseJson = {
    data: {
        guillotine: {
            query: [{
                valid: true
            }]
        }
    }
};

const PAGE_COMPONENT: RecursivePartial<Component> = {
    // fragment: null,
    type: 'page',
    path: '/',
    page: {
      descriptor: 'com.example.myproject:main',
      configAsJson: {
        'com-example-myproject': {
          main: {}
        }
      },
    //   template: null
    },
    // layout: null,
    // text: null,
    // part: null,
    // image: null
  };

const GUILLOTINE_RESULT_META_FOR_ARTICLES: GuillotineResponseJson = {
    data: {
        guillotine: {
            get: {
                type: 'portal:site',
                components: [PAGE_COMPONENT]
            }
        }
    }
}

const GUILLOTINE_RESULT_CONTENT_WITH_ARTICLES: GuillotineResponseJson = {
    data: {
        guillotine: {
            get: {
                children: [{
                    _path: 'articles',
                }]
            }
        }
    }
}

const GUILLOTINE_RESULT_CONTENT: GuillotineResponseJson = {
    data: {
      request0: {
        get: {
          displayName: 'HMDB',
          _id: 'f5815ec2-26e0-4595-b37b-c2ba0d3c1e1c',
          type: 'portal:site',
          dataAsJson: {
            siteConfig: [
              {
                applicationKey: 'com.example.myproject',
                config: {}
              },
              {
                applicationKey: 'com.enonic.app.nextxp',
                config: {}
              }
            ]
          },
          xAsJson: {}
        },
        getSite: {
          displayName: 'HMDB',
          _path: '/hmdb'
        }
      },
      request1: {
        getSite: {
          displayName: 'HMDB'
        },
        get: {
          displayName: 'HMDB',
          children: [
            {
              _path: 'articles',
              _id: '401e72d0-6f15-4079-9d12-4f21d75e85f1',
              displayName: 'Articles'
            },
            {
              _path: 'movies',
              _id: '66281d64-089a-48d2-81e1-7838d2b9b903',
              displayName: 'Movies'
            },
            {
              _path: 'persons',
              _id: 'ff9e01f1-9284-453e-9900-9178104d3258',
              displayName: 'Persons'
            },
            {
              _path: 'playlists',
              _id: 'adb39d00-dcf8-4efb-82ba-45238a24965b',
              displayName: 'Playlists'
            },
            {
              _path: '_templates',
              _id: '50523421-3bc1-42e0-9f23-7e9b0b86f43c',
              displayName: 'Templates'
            }
          ]
        }
      }
    }
  };

const GUILLOTINE_RESULT_META_MINIMAL: GuillotineResponseJson = {
    data: {
        guillotine: {
            get: {
                // _id: '_id',
                // _name: '_name',
                _path: '_path',
                type: 'type',
            }
        }
    }
};

const GUILLOTINE_RESULT_META_INCOMPLETE: GuillotineResponseJson = {
    data: {
        guillotine: {
            get: {} // missing type
        }
    }
};

const GUILLOTINE_RESULT_META: GuillotineResponseJson = {
    data: {
      guillotine: {
        get: {
          _path: '/hmdb',
          type: 'portal:site',
          components: [
            {
              fragment: null,
              type: 'page',
              path: '/',
              page: {
                descriptor: 'com.example.myproject:main',
                configAsJson: {
                  'com-example-myproject': {
                    main: {}
                  }
                },
                template: null
              },
              layout: null,
              text: null,
              part: null,
              image: null
            },
            {
              fragment: null,
              type: 'layout',
              path: '/main/0',
              page: null,
              layout: {
                descriptor: 'com.example.myproject:2-column',
                configAsJson: null
              },
              text: null,
              part: null,
              image: null
            },
            {
              fragment: null,
              type: 'part',
              path: '/main/0/left/0',
              page: null,
              layout: null,
              text: null,
              part: {
                descriptor: 'com.example.myproject:heading',
                configAsJson: {
                  'com-example-myproject': {
                    heading: {
                      heading: 'Jalla2'
                    }
                  }
                },
                config: {
                  com_example_myproject: {
                    heading: {
                      heading: 'Jalla2'
                    },
                    child_list: null
                  }
                }
              },
              image: null
            },
            {
              fragment: null,
              type: 'text',
              path: '/main/0/left/1',
              page: null,
              layout: null,
              text: {
                value: {
                  processedHtml: '<p>Bla bla</p>\n',
                  macros: [],
                  links: [],
                  images: []
                }
              },
              part: null,
              image: null
            },
            {
              fragment: null,
              type: 'part',
              path: '/main/0/right/0',
              page: null,
              layout: null,
              text: null,
              part: {
                descriptor: 'com.example.myproject:child-list',
                configAsJson: {
                  'com-example-myproject': {
                    'child-list': {
                      sorting: 'displayName ASC'
                    }
                  }
                },
                config: {
                  com_example_myproject: {
                    heading: null,
                    child_list: {
                      sorting: 'displayName ASC'
                    }
                  }
                }
              },
              image: null
            }
          ]
        }
      }
    }
  };

const GUILLOTINE_RESULT_WITH_ERROR: GuillotineResponseJson = {
    errors: [{
        errorType: 'ValidationError',
        locations: [{
            column: 0,
            line: 0,
        }],
        message: 'message',
        validationErrorType: 'FieldUndefined',
    }]
};


function mockFetch({
    contentJson,
    contentOk = true,
    contentStatus = 200,
    metaJson,
    metaOk = true,
    metaStatus = 200,
}: {
    contentJson: GuillotineResponseJson
    contentOk?: boolean
    contentStatus?: number
    metaJson: GuillotineResponseJson
    metaOk?: boolean
    metaStatus?: number
}) {
    let i = 0;
    jest.spyOn(globalThis, 'fetch').mockImplementation((url, init = {}) => {
        let json = metaJson;
        let ok = metaOk;
        let status = metaStatus;
        if (i === 1) {
            json = contentJson;
            ok = contentOk;
            status = contentStatus;
        }
        if (i === 2) {
            throw new Error('jest.spyOn fetch error');
        }
        i++;
        return Promise.resolve({
            json: () => Promise.resolve(json),
            text: () => Promise.resolve(JSON.stringify(json)),
            ok,
            status
        } as Response);
    });
}

describe('guillotine', () => {
    describe('fetchContent', () => {

        beforeAllTestsInThisDescribe(() => {
            jest.replaceProperty(process, 'env', {
                ...OLD_ENV,
                // RUNTIME_ENV: 'client'
                RUNTIME_ENV: 'server'
            });
        });

        afterAllTestsInThisDescribe(() => {
            jest.resetModules();
            jest.restoreAllMocks(); // Restores all mocks and replaced properties back to their original value.
        });

        const TESTS = {
            'edit': 'draft',
            'inline': 'draft',
            'preview': 'draft',
            'live': 'master',
            'admin': 'draft',
            'next': 'master',
        };
        Object.entries(TESTS).forEach(([mode, branch]) => {
            it(`${mode}`, () => {
                mockFetch({
                    contentJson: GUILLOTINE_RESULT_CONTENT,
                    metaJson: GUILLOTINE_RESULT_META_MINIMAL,
                });
                import('../../src').then((moduleName) => {
                    const context: Context = {
                        headers: {
                            get(name: string) {
                                if (name === 'content-studio-mode') {
                                    return mode;
                                }
                                if (name === 'content-studio-project') {
                                    return 'prosjekt';
                                }
                                if (name === 'jsessionid') {
                                    return '1234';
                                }
                                if (name === XP_BASE_URL_HEADER) {
                                    return '/admin/SOMETHING';
                                }
                                console.error('headers get name', name);
                            }
                        },
                    } as Context;
                    expect(moduleName.fetchContent(context)).resolves.toStrictEqual({
                        common: null,
                        data: null,
                        // error: {
                        //     // code: '404',
                        //     // message: 'No meta data found for content, most likely content does not exist',
                        //     code: 'API',
                        //     message: "Cannot destructure property 'path' of 'variables' as it is undefined.",
                        // },
                        meta: {
                            apiUrl: `http://localhost:8080/site/prosjekt/${branch}`,
                            baseUrl: '/admin/SOMETHING',
                            canRender: false,
                            catchAll: false,
                            defaultLocale: 'en',
                            locale: 'no',
                            path: '',
                            renderMode: mode,
                            requestType: 'type',
                            type: 'type',
                        },
                        page: {
                            path: '/',
                            type: 'page',
                        },
                    }); // expect
                }); // import
            }); // it
        }); // TESTS.forEach

        it('handles context without headers', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_CONTENT,
                metaJson: GUILLOTINE_RESULT_META_MINIMAL,
            });
            const context: Context = {
                contentPath: '/content/path',
                // headers
            };
            import('../../src/guillotine/fetchContent').then(({fetchContent}) => {
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    common: null,
                    data: null,
                    meta: {
                        apiUrl: `http://localhost:8080/site/project/master`,
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '/content/path',
                        renderMode: 'next',
                        requestType: 'type',
                        type: 'type',
                    },
                    page: {
                        path: '/',
                        type: 'page',
                    },
                });
            });
        }); // it handles context without headers

        it('handles component paths', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_CONTENT,
                metaJson: GUILLOTINE_RESULT_META_MINIMAL,
            });
            const context: Context = {
                contentPath: '_/component/path',
            };
            import('../../src/guillotine/fetchContent').then(({fetchContent}) => {
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    common: null,
                    data: null,
                    error: {
                        code: '404',
                        message: 'Component /path was not found',
                    },
                    meta: {
                        apiUrl: `http://localhost:8080/site/project/master`,
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '_/component/path',
                        renderMode: 'next',
                        requestType: 'type',
                        type: '',
                    },
                    page: null,
                });
            });
        }); // it handles component paths

        it('handles metaResult without results', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_WITH_ERROR, // Throws before this is used
                metaJson: {
                    data: {
                        guillotine: {}
                    }
                },
            });
            import('../../src').then(async ({fetchContent}) => {
                const context: Context = {
                    contentPath: '_/component/path',
                };
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    error: {
                        code: '404',
                        message: 'No meta data found for content, most likely content does not exist',
                    },
                    page: null,
                    common: null,
                    data: null,
                    meta: {
                        apiUrl: 'http://localhost:8080/site/project/master',
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '_/component/path',
                        requestType: 'type',
                        renderMode: 'next',
                        type: '',
                    },
                });
            });
        }); // it handles metaResult without results

        it('handles metaResult with an error', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_WITH_ERROR, // Throws before this is used
                metaJson: GUILLOTINE_RESULT_WITH_ERROR,
            });
            import('../../src').then(async ({fetchContent}) => {
                const context: Context = {
                    contentPath: '_/component/path',
                };
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    error: {
                        code: '500',
                        message: 'Server responded with 1 error(s), probably from guillotine - see log.',
                    },
                    page: null,
                    common: null,
                    data: null,
                    meta: {
                        apiUrl: 'http://localhost:8080/site/project/master',
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '_/component/path',
                        requestType: 'type',
                        renderMode: 'next',
                        type: '',
                    },
                });
            });
        }); // it handles metaResult with an error

        it('handles metaResult.meta without type', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_WITH_ERROR, // Throws before this is used
                metaJson: GUILLOTINE_RESULT_META_INCOMPLETE,
            });
            import('../../src').then(async ({fetchContent}) => {
                const context: Context = {
                    contentPath: '_/component/path',
                };
                const promise = fetchContent(context);
                // await promise;
                expect(promise).resolves.toStrictEqual({
                    error: {
                        code: '500',
                        message: "Server responded with incomplete meta data: missing content 'type' attribute.",
                    },
                    page: null,
                    common: null,
                    data: null,
                    meta: {
                        apiUrl: 'http://localhost:8080/site/project/master',
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '_/component/path',
                        requestType: 'type',
                        renderMode: 'next',
                        type: '',
                    },
                });
            });
        }); // it handles metaResult.meta without type

        it('handles content type that is not accessible in render mode next ', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_WITH_ERROR, // Throws before this is used
                metaJson: {
                    data: {
                        guillotine: {
                            get: {
                                _path: '_path',
                                type: FRAGMENT_CONTENTTYPE_NAME
                            }
                        }
                    }
                
                },
            });
            import('../../src').then(async ({fetchContent}) => {
                const context: Context = {
                    contentPath: '_/component/path',
                    headers: {
                        get(name: string) {
                            if (name === RENDER_MODE_HEADER) {
                                return RENDER_MODE.NEXT
                            }
                            // console.debug('headers get name', name);
                            return '';
                        }
                    } as Context['headers'],
                };
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    error: {
                        code: '404',
                        message: `Content type [${FRAGMENT_CONTENTTYPE_NAME}] is not accessible in ${RENDER_MODE.NEXT} mode`,
                    },
                    page: null,
                    common: null,
                    data: null,
                    meta: {
                        apiUrl: 'http://localhost:8080/site/project/master',
                        baseUrl: '/',
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: '_/component/path',
                        requestType: 'type',
                        renderMode: 'next',
                        type: '',
                    },
                }); // expect
            }); // import
        }); // it

        it('changes requestType to page for fetchContentData when requestType is not component, but the meta response has components', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_CONTENT_WITH_ARTICLES,
                metaJson: GUILLOTINE_RESULT_META_FOR_ARTICLES
            });
            const CONTENT_PATH = 'articles'; // Must be present in contentJson
            const BASE_URL = '/base/url';
            const QUERY_COMMON = `query($path:ID!){
                guillotine {
                  get(key:$path) {
                    displayName
                    _id
                    type
                    dataAsJson
                    xAsJson
                  }
                  getSite {
                    displayName
                    _path
                  }
                }
              }`;
            import('../../src').then(async ({ComponentRegistry, fetchContent}) => {
                ComponentRegistry.setCommonQuery(QUERY_COMMON);
                ComponentRegistry.addContentType(CATCH_ALL, {
                    configQuery: '{catchAll contentType configQuery}',
                    query: 'query { guillotine { catchAll } }',
                    view: () => {return 'catchAll contentType';},
                });
                ComponentRegistry.addLayout(CATCH_ALL, {
                    configQuery: '{catchAll layout configQuery}',
                    query: '{catchAll layout query}',
                    view: () => {return 'catchAll layout';},
                });
                ComponentRegistry.addMacro(CATCH_ALL, {
                    configQuery: '{catchAll macro configQuery}',
                    query: '{catchAll macro query}',
                    view: () => {return 'catchAll macro';},
                });
                ComponentRegistry.addPage(CATCH_ALL, {
                    configQuery: '{catchAll page configQuery}',
                    query: '{catchAll page query}',
                    view: () => {return 'catchAll page';},
                });
                ComponentRegistry.addPart(CATCH_ALL, {
                    configQuery: '{catchAll part configQuery}',
                    query: '{catchAll part query}',
                    view: () => {return 'catchAll part';},
                });
                const context: Context = {
                    contentPath: CONTENT_PATH, // Anything but _/component
                    headers: {
                        get(name: string) {
                            if (name === RENDER_MODE_HEADER) {
                                return RENDER_MODE.NEXT
                            }
                            if (name === PROJECT_ID_HEADER) {
                                return 'project';
                            }
                            if (name === JSESSIONID_HEADER) {
                                return '1234';
                            }
                            if (name === XP_BASE_URL_HEADER) {
                                return BASE_URL;
                            }
                            console.debug('headers get name', name);
                            return '';
                        }
                    } as Context['headers'],
                };
                const promise = fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    common: {},
                    data: {
                        get: {
                            children:[{
                                _path: 'articles'
                            }],
                        },
                    },
                    meta: {
                        apiUrl: 'http://localhost:8080/site/project/master',
                        baseUrl: BASE_URL,
                        canRender: true,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'en',
                        path: CONTENT_PATH,
                        requestType: XP_REQUEST_TYPE.PAGE, // Changed internally from type to page
                        renderMode: 'next',
                        type: 'portal:site',
                    },
                    page: PAGE_COMPONENT,
                }); // expect
            }); // import
        }); // it

        it('handles fetchContent with an error', () => {
            mockFetch({
                contentJson: GUILLOTINE_RESULT_WITH_ERROR,
                metaJson: GUILLOTINE_RESULT_META,
            });
            const BASE_URL = '/base/url';
            import('../../src').then((moduleName) => {
                const context: Context = {
                    headers: {
                        get(name: string) {
                            if (name === RENDER_MODE_HEADER) {
                                return 'next';
                            }
                            if (name === PROJECT_ID_HEADER) {
                                return 'prosjekt'; // Affects locale
                            }
                            if (name === JSESSIONID_HEADER) {
                                return '1234';
                            }
                            if (name === XP_BASE_URL_HEADER) {
                                return BASE_URL;
                            }
                            console.error('headers get name', name);
                        }
                    },
                } as Context;
                const promise = moduleName.fetchContent(context);
                expect(promise).resolves.toStrictEqual({
                    common: null,
                    data: null,
                    error: {
                        code: '500',
                        message: 'Server responded with 1 error(s), probably from guillotine - see log.',
                    },
                    meta: {
                        apiUrl: `http://localhost:8080/site/prosjekt/master`,
                        baseUrl: BASE_URL,
                        canRender: false,
                        catchAll: false,
                        defaultLocale: 'en',
                        locale: 'no',
                        path: '',
                        renderMode: 'next',
                        requestType: 'type',
                        type: '',
                    },
                    page: null,
                }); // expect
            }); // import
        }); // it

    }); // describe fetchContent
}); // describe guillotine