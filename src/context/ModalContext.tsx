"use client"
// src/context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the context state
type ModalContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalPrevent: boolean,
    setModalPrevent: React.Dispatch<React.SetStateAction<boolean>>,
    openModal: () => void;
    closeModal: () => void;
};

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalPrevent, setModalPrevent] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // if the click happens on cloes icon close the modal    
            if (target.closest('.modal-close')) {
                closeModal();
            }
            // Check if the clicked target is inside a Jodit dropdown
            if (target.closest('.jodit-toolbar-button') || target.closest('.modal') || target.closest('.jodit-popup__content')) {
                setModalPrevent(true);
            }
            else {
                setModalPrevent(false);
                closeModal();
            }
        };

        // Attach the event listener to the document for event delegation
        document.addEventListener('click', handleClickOutsideDropdown, true);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutsideDropdown, true);
        };
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen, openModal, closeModal, modalPrevent, setModalPrevent }}>
            {children}
        </ModalContext.Provider>
    );
};

// Create a custom hook for using the Modal context
export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
