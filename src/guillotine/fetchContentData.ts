import type {
    ContentApiBaseBody,
    ContentResult,
    ProjectLocaleConfig,
} from '../types';


import {fetchGuillotine} from './fetchGuillotine';


export const fetchContentData = async <T>(
    contentApiUrl: string,
    xpContentPath: string,
    projectConfig: ProjectLocaleConfig,
    query: string,
    variables?: {},
    headers?: {},
): Promise<ContentResult> => {

    const body: ContentApiBaseBody = {query};
    if (variables && Object.keys(variables).length > 0) {
        body.variables = variables;
    }
    const contentResults = await fetchGuillotine(contentApiUrl, body, projectConfig, headers);

    if (contentResults.error) {
        return contentResults;
    } else {
        return {
            // omit the aliases and return values
            contents: Object.values(contentResults),
        };
    }
};