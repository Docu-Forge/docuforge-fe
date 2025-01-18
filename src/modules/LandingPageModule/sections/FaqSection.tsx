import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

export const FaqSection: React.FC = () => {
  return (
    <section className="container px-4 relative mx-auto max-w-screen-xl mb-20">
      <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-6 mb-10 text-center text-[#161d33] relative">
        Frequently Asked Question About{' '}
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold ">
          DocuForge
        </span>
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is DocuForge?</AccordionTrigger>
          <AccordionContent>
            <strong>DocuForge</strong> is an AI-powered platform designed to
            simplify document creation. It helps users generate, customize, and
            sign professional documents with ease and accuracy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Does DocuForge support e-signatures?
          </AccordionTrigger>
          <AccordionContent>
            Yes, DocuForge comes with an integrated and secure e-signature
            feature powered by <strong>DocuSign</strong>, a leading technology
            in digital signature solutions. With DocuSign, you can sign your
            documents digitally with confidence, ensuring they are legally
            binding and secure.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is DocuForge secure?</AccordionTrigger>
          <AccordionContent>
            Yes, security is our priority. DocuForge uses encryption and follows
            industry standards to protect your data and ensure your documents
            remain confidential.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What types of documents can DocuForge create?
          </AccordionTrigger>
          <AccordionContent>
            <span>DocuForge supports a variety of documents, including: </span>
            <ul className="list-disc pl-6">
              <li>Contracts.</li>
              <li>Agreements.</li>
              <li>Legal notices.</li>
              <li>Business proposals.</li>
              <li>etc.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
