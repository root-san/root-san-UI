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
 * @interface Txn
 */
export interface Txn {
    /**
     * 
     * @type {number}
     * @memberof Txn
     */
    amount: number;
    /**
     * 
     * @type {string}
     * @memberof Txn
     */
    receiver: string;
    /**
     * 
     * @type {string}
     * @memberof Txn
     */
    payer: string;
    /**
     * 
     * @type {string}
     * @memberof Txn
     */
    id: string;
}

/**
 * Check if a given object implements the Txn interface.
 */
export function instanceOfTxn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "amount" in value;
    isInstance = isInstance && "receiver" in value;
    isInstance = isInstance && "payer" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function TxnFromJSON(json: any): Txn {
    return TxnFromJSONTyped(json, false);
}

export function TxnFromJSONTyped(json: any, ignoreDiscriminator: boolean): Txn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': json['amount'],
        'receiver': json['receiver'],
        'payer': json['payer'],
        'id': json['id'],
    };
}

export function TxnToJSON(value?: Txn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
        'receiver': value.receiver,
        'payer': value.payer,
        'id': value.id,
    };
}

