import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
import { Tour, Image, Card, Col, Statistic, Row } from 'antd';
import type { TourProps } from 'antd';
import { LoginOutlined, EnterOutlined, LeftSquareOutlined, UpSquareOutlined, DownSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import { useMyContext } from '../../Utils/useMyContext';
import useBikeContext from '../../Containers/hooks/useBikeContext';

const TutorialModal: React.FC = () => {
  const { tutorialModalOpen, setTutorialModalOpen } = useMyContext();
  const { setBikeEnabled } = useBikeContext();

  const steps: TourProps['steps'] = [
    {
      title: null,
      cover: (
        <h1> Welcome to NTUniverse </h1>
      ),
      nextButtonProps: { children: '下一步' },
    },
    {
      title: null,
      cover: (
        <>
          <LoginOutlined style={{ fontSize: '20px' }} /><h2 style={{ display: 'inline', marginLeft: '5px' }}>登入 Google</h2>
          <p>登入帳戶來獲得完整體驗</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_bike.gif' />
          <h2>腳踏車🚲～</h2>
          <p>利用 WSAD 來控制腳踏車</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <div>
            <Row gutter={5} style={{ marginBottom: '5px' }}>
              <Col span={17}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="操控汽車"
                    value={"W S A D / "}
                    suffix={<><LeftSquareOutlined /><UpSquareOutlined /><DownSquareOutlined /><RightSquareOutlined /></>}
                  //prefix={<TeamOutlined />}
                  />

                </Card>
              </Col>
              <Col span={7}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="回到起點"
                    value={"R"}
                  //prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={5} style={{ marginBottom: '5px' }}>
              <Col span={6}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="喇叭"
                    value={"L"}
                  //prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
              <Col span={11}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="與地圖互動"
                    value={"E / Enter"}
                    suffix={<EnterOutlined />}
                  />
                </Card>
              </Col>
              <Col span={7}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="鎖定視角"
                    value={"Y"}
                  //prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={5} style={{ marginBottom: '5px' }}>
              <Col span={12}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="煞車"
                    value={"Space"}
                    suffix={"⎵"}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{
                    height: '100%',
                  }}
                >
                  <Statistic
                    title="切換第一/第三人稱視角"
                    value={"Ｆ"}
                  //suffix={<EnterOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_chat.png' />
          <h2>聊天室</h2>
          <p>與朋友加入同一個聊天室盡情暢談</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_bulletin.gif' />
          <h2>留言板</h2>
          <p>在各個景點留言來跟大家交流！</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_game.gif' />
          <h2>小遊戲</h2>
          <p>在校園到處逛逛，發掘各種有趣的小遊戲吧！</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_start.png' />
          <h2>Let's GO!</h2>
          <p>騎上腳踏車，開始你的冒險！</p>
        </>
      ),
      nextButtonProps: { children: '完成' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
  ];

  return (
    <>
      <Tour
        open={tutorialModalOpen}
        onClose={() => { setBikeEnabled(true); setTutorialModalOpen(false) }}
        steps={steps}
      />
    </>
  )
}

export default TutorialModal;

