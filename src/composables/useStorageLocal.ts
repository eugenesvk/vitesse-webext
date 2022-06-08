import {storage}           	from 'webextension-polyfill'
import type                	{
  AsyncStorage             	,
  AnyStorageProps          	,
  AsyncStorageWithOptions  	,
  AsyncStorageObject       	,
  AsyncStorageSetter       	,
  // AsyncStorageActions   	, // not exported in index.d.ts from types-7e293a10
}                          	from '@solid-primitives/storage'
import {createAsyncStorage}	from '@solid-primitives/storage'

export type AsyncStorageActions<T> = {
  remove	: (key:string)	=> Promise<void> | void;
  clear 	: ()          	=> Promise<void> | void;
  error 	: ()          	=> Error | undefined;
  toJSON	: ()          	=> Promise<{ [key:string]:T;}>;
};

export const storageLocalAPI:AsyncStorage = {
     getItem	: async (key:string)             	=>(await storage.local.get(  key))[key],
     setItem	:       (key:string,value:string)	=>       storage.local.set( {[key]:value}),
  removeItem	:       (key:string)             	=>       storage.local.remove(key),
  clear     	:       ()                       	=> void  storage.local.clear(),
  key       	:       (index:number)           	=>       undefined,
  length    	:                                	         undefined
};

export const useStorageLocal = <O, T>(
  props?:AnyStorageProps<T, AsyncStorage|AsyncStorageWithOptions<O>, O>
  ):[store  	: AsyncStorageObject< T>,
     setter 	: AsyncStorageSetter< T, O>,
     actions	: AsyncStorageActions<T>
  ] => createAsyncStorage(props)
