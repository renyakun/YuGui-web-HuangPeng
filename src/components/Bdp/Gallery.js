import React, { PureComponent } from 'react';
import styles from './Gallery.less';

export default class Gallery extends PureComponent {
  static defaultProps = {
    max: 4, // 超出四个往右滚动的按钮出现
    thumbWidth: 70,
  };
  state = { preview: undefined, showPreview: false, offsetIndex: 0 };

  render() {
    const { list, max, thumbWidth } = this.props;
    const { preview, showPreview, offsetIndex } = this.state;
    const len = list.length;
    const rightActive = offsetIndex < len - max;
    const leftActive = offsetIndex > 0;

    return (
      <div className={styles.gallery}>
        <span
          className={`${styles.left} ${leftActive && styles['left--active']}`}
          onClick={() => {
            if (leftActive) {
              this.setState({ offsetIndex: offsetIndex - 1 });
            }
          }}
        >
          <span>{'<'}</span>
        </span>
        <div className={styles.thumbsWrapper}>
          <div
            className={styles.thumbs}
            style={{ transform: `translateX(${-offsetIndex * thumbWidth}px)` }}
          >
            {list &&
              list.map((item, index) => (
                <div className={styles.thumb} key={index}>
                  <img
                    src={item}
                    alt="质检报告"
                    onClick={() =>
                      this.setState({
                        preview: item,
                        showPreview: true,
                      })
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        <span
          className={`${styles.right} ${rightActive && styles['right--active']}`}
          onClick={() => {
            if (rightActive) {
              this.setState({ offsetIndex: offsetIndex + 1 });
            }
          }}
        >
          <span>{'>'}</span>
        </span>
        {showPreview && (
          <div
            className={styles.preview}
            onClick={() =>
              this.setState({
                showPreview: false,
              })
            }
          >
            <span className={styles.close}>关闭</span>
            <img src={preview} alt="质检报告" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    );
  }
}
