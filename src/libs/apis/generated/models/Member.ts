/* tslint:disable */
/* eslint-disable */
/**
 * root-san API
 * 割り勘アプリ
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Member
 */
export interface Member {
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    name: string;
}

/**
 * Check if a given object implements the Member interface.
 */
export function instanceOfMember(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function MemberFromJSON(json: any): Member {
    return MemberFromJSONTyped(json, false);
}

export function MemberFromJSONTyped(json: any, ignoreDiscriminator: boolean): Member {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function MemberToJSON(value?: Member | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}

