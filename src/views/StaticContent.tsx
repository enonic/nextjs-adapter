import {createElement, createRef, ReactNode, useEffect, useState} from 'react';

function useStaticContent(ref, isServer) {
    if (isServer) {
        return false;
    }

    if (ref?.current?.innerHTML === '') {
        return false;
    }

    return true;
}

export interface StaticContentProps extends Record<string, any> {
    children?: ReactNode | ReactNode[];
    element?: string;
    condition: boolean;
}

export default function StaticContent({children, element = 'div', condition = true, ...props}: StaticContentProps) {
    const isServer = typeof window === 'undefined';
    const ref = createRef();
    const isStatic = useStaticContent(ref, isServer);

    // avoid re-render on the client
    if (isStatic && condition) {
        return createElement(element, {
            ...props,
            ref,
            suppressHydrationWarning: true,
            dangerouslySetInnerHTML: {__html: ''},
        });
    }

    // just render if:
    // - condition is false
    // - we're in the server or a spa navigation
    return createElement(element, props, ...[].concat(children));
}
