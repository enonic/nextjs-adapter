import type {MetaData, TextData} from '../types';


import React from 'react';
import RichTextView from './RichTextView';


interface Props {
    meta: MetaData
    component: TextData
    path: string
}


const DefaultTextView = ({component, meta, path}: Props) => (
    <RichTextView data={component.value} meta={meta} renderMacroInEditMode={false}/>
);

export default DefaultTextView;
