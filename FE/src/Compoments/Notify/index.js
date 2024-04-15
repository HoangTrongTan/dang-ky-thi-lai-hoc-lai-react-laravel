import Tippy from '@tippyjs/react';
import style from './Notify.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Notify() {
    return ( <>
        <Tippy
            render={atrris => (
                <div className={cx('wrapper')}>
                    
                </div>
            )}
        >
            <button className={cx("button")}>
              <Ring className={cx("bell")} />
            </button>
        </Tippy>
    </> );
}

export default Notify;