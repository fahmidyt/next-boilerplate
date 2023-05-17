import React, { createRef, useEffect, useMemo, useState, useContext } from 'react'
import { composeRef } from 'rc-util/lib/ref'

import type { BaseButtonProps, ButtonProps, Loading, LoadingConfigType } from "./button.type";

import DisabledContext from './config/DisabledContext';

function getLoadingConfig(loading: BaseButtonProps['loading']): LoadingConfigType {
    if (typeof loading === 'object' && loading) {
        const delay = loading?.delay;
        const isDelay = !Number.isNaN(delay) && typeof delay === 'number';
        return {
            loading: false,
            delay: isDelay ? delay : 0,
        };
    }

    return {
        loading: !!loading,
        delay: 0,
    };
}

const InternalButton: React.ForwardRefRenderFunction<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
> = (props, ref) => {
    const {
        loading = false,
        size: customizeSize,
        disabled: customDisabled,
        className,
        children,
        icon,
        block = false,
        // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
        htmlType = 'button',
        ...rest
    } = props

    const internalRef = createRef<HTMLButtonElement | HTMLAnchorElement>();

    const loadingOrDelay = useMemo<LoadingConfigType>(() => getLoadingConfig(loading), [loading]);

    const disabled = useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const [innerLoading, setLoading] = useState<Loading>(loadingOrDelay.loading);

    const buttonRef = composeRef(ref, internalRef);

    /**
     * Use effect on Loading / Delay
     */
    useEffect(() => {
        let delayTimer: NodeJS.Timer | null = null;

        if (loadingOrDelay.delay > 0) {
            delayTimer = setTimeout(() => {
                delayTimer = null;
                setLoading(true);
            })
        } else {
            setLoading(loadingOrDelay.loading);
        }

        function cleanupTimer() {
            if (delayTimer) {
                clearTimeout(delayTimer);
                delayTimer = null;
            }
        }

        return cleanupTimer;

    }, [loadingOrDelay])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
        const { onClick } = props;
        // FIXME: https://github.com/ant-design/ant-design/issues/30207
        if (innerLoading || mergedDisabled) {
            e.preventDefault();
            return;
        }
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
    };

}


export default function Buttons() {
    return <div>
        Button
    </div>
}