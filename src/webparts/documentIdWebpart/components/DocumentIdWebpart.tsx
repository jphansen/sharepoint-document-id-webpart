import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IDocumentIdWebpartProps } from './IDocumentIdWebpartProps';

export interface IDocumentIdWebpartState {
  isLoading: boolean;
  message: string;
  messageType: MessageBarType;
}

export default class DocumentIdWebpart extends React.Component<IDocumentIdWebpartProps, IDocumentIdWebpartState> {

  constructor(props: IDocumentIdWebpartProps) {
    super(props);
    
    this.state = {
      isLoading: false,
      message: '',
      messageType: MessageBarType.info
    };
  }

  private _sendPostRequest = async (): Promise<void> => {
    this.setState({ 
      isLoading: true, 
      message: 'Sending request...', 
      messageType: MessageBarType.info 
    });

    try {
      const { postUrl, documentId } = this.props;
      
      if (!postUrl) {
        throw new Error('POST URL is not configured. Please configure it in the webpart properties.');
      }

      // Construct URL with Name parameter containing document ID
      const urlWithParams = `${postUrl}${postUrl.includes('?') ? '&' : '?'}Name=${encodeURIComponent(documentId)}`;

      // Send POST request
      const response = await fetch(urlWithParams, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          documentId: documentId,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        this.setState({
          isLoading: false,
          message: `Request sent successfully! Document ID: ${documentId}`,
          messageType: MessageBarType.success
        });
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        message: `Error: ${error.message}`,
        messageType: MessageBarType.error
      });
    }
  }

  public render(): React.ReactElement<IDocumentIdWebpartProps> {
    const { description, documentId } = this.props;
    const { isLoading, message, messageType } = this.state;

    return (
      <div style={{ padding: '20px' }}>
        <h2>Document ID WebPart</h2>
        <p>{description || 'This webpart sends the current document ID via POST request.'}</p>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Current Document ID:</strong> {documentId}
        </div>

        <PrimaryButton 
          text={isLoading ? "Sending..." : "Send Document ID"}
          onClick={this._sendPostRequest}
          disabled={isLoading}
          style={{ marginBottom: '10px' }}
        />

        {message && (
          <MessageBar messageBarType={messageType} isMultiline={false}>
            {message}
          </MessageBar>
        )}
      </div>
    );
  }
}
