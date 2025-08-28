import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'DocumentIdWebpartWebPartStrings';
import DocumentIdWebpart from './components/DocumentIdWebpart';
import { IDocumentIdWebpartProps } from './components/IDocumentIdWebpartProps';

export interface IDocumentIdWebpartWebPartProps {
  description: string;
  postUrl: string;
}

export default class DocumentIdWebpartWebPart extends BaseClientSideWebPart<IDocumentIdWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDocumentIdWebpartProps> = React.createElement(
      DocumentIdWebpart,
      {
        description: this.properties.description,
        postUrl: this.properties.postUrl,
        spHttpClient: this.context.spHttpClient,
        currentWebUrl: this.context.pageContext.web.absoluteUrl,
        documentId: this._getCurrentDocumentId()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getCurrentDocumentId(): string {
    // Try to get document ID from various sources
    const pageContext = this.context.pageContext;
    
    // Check if we're on a document page
    if (pageContext.list && pageContext.listItem) {
      return pageContext.listItem.id.toString();
    }
    
    // Fallback to page ID if available
    if (pageContext.listItem) {
      return pageContext.listItem.id.toString();
    }
    
    // Default fallback
    return "unknown";
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('postUrl', {
                  label: 'POST URL',
                  description: 'The URL to send the POST request to'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
