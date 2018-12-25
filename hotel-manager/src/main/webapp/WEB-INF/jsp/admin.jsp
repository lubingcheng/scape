<%--
  Created by IntelliJ IDEA.
  User: fanl
  Date: 2018/12/24
  Time: 18:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="css/iview.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <script src="js/vue.min.js"></script>
    <script src="js/iview.min.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
</head>
<body>
<div id="app">
    <div class="layout">
        <Layout>
            <Header>
                <i-Menu mode="horizontal" theme="dark" active-name="1" @on-select="sysChange">
                    <div class="layout-title">
                        景区导航后台管理系统
                    </div>
                </i-Menu>
            </Header>
            <Layout>
                <Sider hide-trigger >
                    <i-Menu active-name="3" theme="dark" width="auto" open-names="['0']" @on-select="sysChange">
                        <Menu-Item name="0">
                            <Icon type="md-home"></Icon>
                            景点管理
                        </Menu-Item>
                        <%--<Submenu name="0">--%>
                            <%--<template slot="title">--%>
                                <%--<Icon type="ios-keypad"></Icon>--%>
                                <%--空间分布--%>
                            <%--</template>--%>
                            <%--<Menu-Item name="0-1">--%>
                                <%--<Icon type="ios-keypad"></Icon>--%>
                                <%--用地类型--%>
                            <%--</Menu-Item>--%>
                            <%--<Menu-Item name="0-2">--%>
                                <%--<Icon type="ios-keypad"></Icon>--%>
                                <%--用地状态--%>
                            <%--</Menu-Item>--%>
                        <%--</Submenu>--%>
                    </i-Menu>
                </Sider>
                <i-Layout>
                    <Content style="background: #fff;">
                        <iframe id="cntIfm" src="page/PointMgr.html" style="height: 100%;overflow-y: auto;"></iframe>
                    </Content>
                </i-Layout>
            </Layout>
        </Layout>
    </div>

</div>

<script src="js/menu.js"></script>
<script src="js/main.js"></script>
</body>
</html>
