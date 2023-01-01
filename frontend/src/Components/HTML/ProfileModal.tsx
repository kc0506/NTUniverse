import React, { useState, useEffect } from 'react';
import { 
    Form,
    Input,
    Button,
    Modal, 
    Row,
    Col,
    Image,
    message 
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];


const ProfileModal = () => {
    const { profileModalOpen, setProfileModalOpen, setBikeEnabled,updateUser, me, setMe } = useMyContext();
    const [ loading, setLoading ] = useState(false);
    const [ canSubmit, setCanSubmit ] = useState(true);
    const [ Nickname, setNickname ] = useState<{value: string; validateStatus?: ValidateStatus; errorMsg?: string | null;}>({value: me['nick_name']});
    const [form] = Form.useForm();

    
    useEffect(() => {
        form.setFieldsValue({
            nick_name: me['nick_name'],
            description: me['description'],
        });
    }, [me])

    const normFile = (e: any) => {
        //console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const onFinish = async () => {
        setLoading(true);
        let user = await updateUser({
            variables:{
                email: me['email'],
                nick_name: form.getFieldValue('nick_name'),
                picture: me['picture'],
                description: form.getFieldValue('description'),
            }
        })
        //console.log(user);
        setMe({
            first_name: user.data.updateUser['first_name'],
            last_name: user.data.updateUser['last_name'],
            nick_name: user.data.updateUser['nick_name'], 
            email: user.data.updateUser['email'], 
            picture: user.data.updateUser['picture'], 
            description: user.data.updateUser['description']
        })
        setTimeout(() => {
            message.success('更新個人資料成功！');
            //console.log(me);
            setProfileModalOpen(false);
            setLoading(false);
            setBikeEnabled(true);
        }, 1000);
    };

    const onFinishFailed = (e) => {
        message.error('更新個人資料失敗！');
    };


    const handleSave =  async () => {
        //console.log(form.getFieldValue('nick_name'));
        form.submit()
    };

    const validateNickName = (value: string): {
            validateStatus: ValidateStatus;
            errorMsg: string | null;
        } => {
        if (value.length > 0 && value[0]!=' ') {
            setCanSubmit(true);
            return {
            validateStatus: 'success',
            errorMsg: null,
            };
        }
        else{
            setCanSubmit(false);
            return {
                validateStatus: 'error',
                errorMsg: '暱稱不可為空！',
            };
        }
    };

    const onNicknameChange = (e) => {
        //console.log(e);
        setNickname({
            ...validateNickName(e.target.value),
            value: e.target.value
        })
        //console.log(canSubmit);
    }

    return (
        <>
            <Modal
                title="個人資料 👤"
                centered
                open={profileModalOpen}
                //onOk={handleOk}
                onCancel={() => { form.setFieldsValue({nick_name: me['nick_name'],description: me['description']}); setProfileModalOpen(false); setBikeEnabled(true);}}
                width={"50vw"}
                bodyStyle={{
                    overflow: 'auto',
                    height: '70vh',
                    padding: 'inherit'
                }}
                footer={[
                    <Button  disabled={canSubmit===false} key="submit" type="primary" loading={loading} onClick={handleSave}>
                      Save
                    </Button>,
                ]}
            >
            <>
                <Form
                    form={form}
                    labelCol={{ offset: 5}}
                    wrapperCol={{ span: 20, offset: 0}}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    
                    <Form.Item label="個人照片">
                        <Image
                            style={{
                                borderRadius: '50%',
                            }}
                            width={150}
                            src={me['picture']}
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                        />
                    </Form.Item>

                    <Form.Item label="全名">
                        <Input.Group>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Input name="名" disabled={true} value={me['first_name']}/>
                                </Col>
                                <Col span={8}>
                                <Input name="姓" disabled={true} value={me['last_name']}/>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="Email"  wrapperCol={{span:15}}>
                        <Input name="Email" disabled={true} value={me['email']}/>
                    </Form.Item>
                    <Form.Item name="nick_name" label="暱稱"  wrapperCol={{span:20}} rules={[{ type: 'string', min: 1 }]} validateStatus={Nickname.validateStatus} help={Nickname.errorMsg || ""}>
                        <Input placeholder={"幫自己取個暱稱吧"} onChange={onNicknameChange}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="想說的話"
                    >
                        <Input.TextArea rows={4} autoSize={{ minRows: 4 }} showCount maxLength={500}  placeholder="你還沒留下任何訊息"/>
                    </Form.Item>

                    {/* <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item> */}
                </Form>
            </>
                                    
            </Modal>
        </>
    )
}

export default ProfileModal;



