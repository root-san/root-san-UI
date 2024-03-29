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
 * @interface RoomRuquestBody
 */
export interface RoomRuquestBody {
    /**
     * 
     * @type {string}
     * @memberof RoomRuquestBody
     */
    name: string;
}

/**
 * Check if a given object implements the RoomRuquestBody interface.
 */
export function instanceOfRoomRuquestBody(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function RoomRuquestBodyFromJSON(json: any): RoomRuquestBody {
    return RoomRuquestBodyFromJSONTyped(json, false);
}

export function RoomRuquestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomRuquestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function RoomRuquestBodyToJSON(value?: RoomRuquestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}

