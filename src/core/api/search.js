/* @flow */
import { callApi } from 'core/api';
import {
  addVersionCompatibilityToFilters,
  convertFiltersToQueryParams,
  fixFiltersForAndroidThemes,
} from 'core/searchUtils';
import type { ApiState } from 'core/reducers/api';

export type SearchParams = {|
  api: ApiState,
  auth?: boolean,
  // TODO: Make a "searchFilters" type because these are the same args
  // for convertFiltersToQueryParams.
  filters: {|
    addonType?: string,
    author?: string,
    clientApp?: string,
    category?: string,
    compatibleWithVersion?: number | string,
    featured?: boolean,
    guid?: string,
    operatingSystem?: string,
    page?: string,
    page_size?: number,
    query?: string,
    sort?: string,
  |},
|};

export function search({ api, auth = false, filters = {} }: SearchParams) {
  const newFilters = addVersionCompatibilityToFilters({
    filters: fixFiltersForAndroidThemes({ api, filters }),
    userAgentInfo: api.userAgentInfo,
  });

  return callApi({
    endpoint: 'addons/search',
    params: convertFiltersToQueryParams(newFilters),
    apiState: api,
    auth,
  });
}
