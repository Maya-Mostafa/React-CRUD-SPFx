declare interface IReactCrudWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListFieldLabel: string;
  ListUrl: string;
}

declare module 'ReactCrudWebPartStrings' {
  const strings: IReactCrudWebPartStrings;
  export = strings;
}
