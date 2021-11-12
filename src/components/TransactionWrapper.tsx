import { ReactElement } from "react";
import { CSSTransition } from "react-transition-group";
const TransitionWrapper = ({ children, isIn, animateName = 'page' }: { children: any, isIn: boolean, animateName?: string }): ReactElement => {
    return <CSSTransition
        classNames={animateName}
        in={isIn}
        unmountOnExit
        timeout={{ enter: 300, exit: 0 }}
    ><div className={animateName}>{children}</div></CSSTransition>
};
export default TransitionWrapper;