'use client'
import { useEffect } from 'react'
import ContentSection from './ContentSection/ContentSection';
import { ProjectComponentProp} from './ProjectComponent.interface';

export default function ProjectComponent({project}:ProjectComponentProp){
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <main>
            {
                project.content.map((content, index)=>(
                    <ContentSection key={`unique-${content.id}`} {...content}/>    
                ))
            }
        </main>
    )
}