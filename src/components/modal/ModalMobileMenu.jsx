import React from 'react';
import cl from './ModalMobileMenu.module.css';

const ModalMobileMenu = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active);
    };

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalMobileMenu;