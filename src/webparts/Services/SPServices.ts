import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import { IDropdownOption } from "office-ui-fabric-react";

export class SPOperations{

    public GetAllList(context: WebPartContext) : Promise <IDropdownOption[]> {

        let restApiUrl: string = context.pageContext.web.absoluteUrl + "/_api/web/lists?select=Title";
        var listTitles : IDropdownOption[] = [];
        
        return new Promise <IDropdownOption []>(async(resolve, reject) =>{
            context.spHttpClient
            .get(restApiUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse)=>{
                response.json().then((results: any) => {
                    console.log(results);
                    results.value.map((result:any)=>{
                        listTitles.push({
                            key:result.Title, 
                            text:result.Title
                        });
                    });
                });
                resolve(listTitles);
            }, (error:any):void=>{
                reject("Error Occured: " + error);
            });            
        })
    }

    //context: WebPartContext, listTitle: string;
    public CreateListItem(context: WebPartContext, listTitle: string, listItemTitleVal: string) : Promise <string>{

        let restApiUrl: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('"+listTitle+"')/items" ;
        const body: string = JSON.stringify({Title: listItemTitleVal});
        const options: ISPHttpClientOptions = {
            headers:{
                Accept: "application/json;odata=nometadata", 
                "Content-Type": "application/json;odata=nometadata",
                "odata-version": ""
            },
            body: body
        }

        return new Promise<string> (async(resolve, reject)=>{
            context.spHttpClient
            .post(restApiUrl, SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse)=>{
                response.json().then((result: any)=>{
                    resolve("Item with ID: " + result.ID + " is created successfully!");
                }, (error:any):void => {
                    reject("Error Occured: " + error);
                })            
            })
        })
    }


    public DeleteListItem(context: WebPartContext, listTitle: string, listItemID: number) : Promise <string>{
        
        let restApiUrl = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('"+listTitle+"')/items("+listItemID+")";
        const options: ISPHttpClientOptions = {
            headers:{
                Accept: "application/json;odata=nometadata", 
                "Content-Type": "application/json;odata=nometadata",
                "odata-version": "",
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            }
        }
        return new Promise <string> (async(resolve, reject)=>{
            context.spHttpClient
            .post(restApiUrl, SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse)=>{
                response.json().then((result: any)=>{
                    resolve("Item with ID: " + result.ID + " is deleted successfully!");
                }, (error:any):void => {
                    reject("Error Occured: " + error);
                })            
            })
        })
    }

    public UpdateListItem(context: WebPartContext, listTitle: string, listItemTitleVal: string, listItemID: number) : Promise <string>{
        
        let restApiUrl = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('"+listTitle+"')/items("+listItemID+")";
        const body: string = JSON.stringify({Title: listItemTitleVal});
        const options: ISPHttpClientOptions = {
            headers:{
                Accept: "application/json;odata=nometadata", 
                "Content-Type": "application/json;odata=nometadata",
                "odata-version": "",
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE",                
            },
            body: body
        }
        return new Promise <string> (async(resolve, reject)=>{
            context.spHttpClient
            .post(restApiUrl, SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse)=>{
                response.json().then((result: any)=>{
                    resolve("Item with ID: " + result.ID + " is updated successfully!");
                }, (error:any):void => {
                    reject("Error Occured: " + error);
                })            
            })
        })
    }


}