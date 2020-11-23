import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  IPropertyPaneSliderProps,
  PropertyPaneCheckbox,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactCrudWebPartStrings';
import ReactCrud from './components/ReactCrud';
import { IReactCrudProps } from './components/IReactCrudProps';

export interface IReactCrudWebPartProps {
  description: string;
  listTitle: string;
  ListUrl: string;
  "Percent Completed": string;
  ValidationRequired: boolean;
  ListName: string;
}

export default class ReactCrudWebPart extends BaseClientSideWebPart<IReactCrudWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactCrudProps> = React.createElement(
      ReactCrud,
      {
        description: this.properties.description,
        context: this.context,
        listTitle: this.properties.listTitle,
        ListUrl: this.properties.ListUrl,
        "Percent Completed": this.properties["Percent Completed"]
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public validateListUrl(value:string):string{
    if(value.length >256)
      return "URL should be less than 256 characters";
    if(value.length == 0)
      return "Enter the list URL";
    return "";
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listTitle', {
                  label: strings.ListFieldLabel,
                }),
                PropertyPaneTextField('ListUrl', {
                  label: strings.ListUrl,
                  onGetErrorMessage: this.validateListUrl.bind(this)
                }),
                PropertyPaneSlider('Percent Completed', {
                  label: "Percent Completed",
                  min: 0,
                  max: 100
                }),
                PropertyPaneCheckbox('ValidationRequired', {
                  text: "Validation Required"
                }),
                PropertyPaneDropdown('ListName',{
                  label: "Select your list",
                  options: [
                    {key: "--Select your list--", text: "--Select your list--"},
                    {key: "Document", text: "Document"},
                    {key: "Test", text: "Test"},
                    {key: "Handson", text: "Handson"},
                  ],
                  selectedKey: "--Select your list--"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
