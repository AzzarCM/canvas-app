import React, {useState} from 'react'
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { Page } from 'react-pdf'
import terms from '../../assets/pdf/terms.pdf';


export const TermsAndCond = () => {
    const [numPages, setNumPages] = useState(null);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    return (
        <div>
        <Document
            file={terms}
            options={{workerSrc: "/pdf.worker.js"}}
            onLoadSuccess={onDocumentLoadSuccess}
        >
        {
            Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
            ))
        }
        </Document>
        </div>
        
    )
}
