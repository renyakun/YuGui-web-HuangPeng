import React from 'react';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';
import Link from 'umi/link';


export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
  showClear = true,
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
                item.avatar
              )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                className={styles.meta}
                title={
                  <div className={styles.title}>
                    <span>
                      <span>{
                        item.message.split(/@\{([^{}]*)\}/gi).map(key => {
                          if (item[key]) {
                            if (item.operationType == 'event' && key == "preUser") {
                              return (<b>你</b>)
                            }
                            if (item.operationType == 'notification' && key == 'userName') {
                              return (<b>你</b>)
                            }
                            if (item.operationType == 'notification' && key == "reportNo") {
                              return (<em style={{ color: 'dodgerblue' }}>{item[key]}</em>)
                            }
                            if (item.operationType == 'event' && key == "reportNo") {
                              return (<em style={{ color: 'dodgerblue' }}>{item[key]}</em>)
                            }
                            return (<span style={{ color: 'dodgerblue' }}>{item[key]}</span>)
                          }
                          return (<span style={{ marginLeft: 5, marginRight: 5 }}>{key}</span>);
                        })
                      }</span>
                    </span>
                  </div>
                }
                description={
                  <span>
                    <span className={styles.datetime} title={item.operationTime} >
                      <em>{item.operationTime.slice(0, 16).replace('T', ' ')}</em>
                    </span>
                  </span>
                }
              />
            </List.Item>
          );
        })}
      </List>
      {showClear ? (
        <div className={styles.clear} onClick={onClear}>
          {/* {locale.clear}  清空{title} */}更多
        </div>
      ) : null}
    </div>
  );
}
