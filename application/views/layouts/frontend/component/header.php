<!DOCTYPE html>
<html lang="vi" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml" itemscope="itemscope" itemtype="http://schema.org/Clip">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
        <title><?php echo isset($title) ? $title : $this->config->item('site_title'); ?></title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="keywords" content="<?php echo isset($keywords) ? $keywords : $this->config->item('site_keywords'); ?>" />
                <meta name="description" content="<?php echo isset($description) ? $description : $this->config->item('site_description'); ?>"/>
                <link rel="shortcut icon" href="<?php echo site_url('publics/frontend/ico/123xem_favicon.png'); ?>"/>
                <meta property="og:title" content="<?php echo isset($title) ? $title : $this->config->item('site_title'); ?>"/>
                <meta property="og:type" content="video.movie" />
                <meta property="og:description" content="<?php echo isset($description) ? $description : $this->config->item('site_description'); ?>"/>
                <meta property="og:url" content="<?php echo current_url(); ?>"/>
                <meta property="og:image" content="<?php echo isset($image) ? $image : $this->config->item('site_image'); ?>"/>
                <meta property="og:site_name" content="123xem.vn"/>
                <meta property="fb:admins" content="100003149415442"/>
                <meta property="fb:app_id" content="<?php echo $app_id; ?>"/>
                <!-- Bootstrap core CSS -->
                <link href="<?php echo site_url('publics/frontend/css/bootstrap.css'); ?>" rel="stylesheet"/>
                <link href="<?php echo site_url('publics/frontend/css/smoothness/jquery-ui-1.9.2.custom.min.css'); ?>" rel="stylesheet"/>
                <!-- Custom styles for this template -->
                <link href="<?php echo site_url('publics/frontend/css/style.css?v=0.1'); ?>" rel="stylesheet"/>
                <!--[if lt IE 9]><script src="<?php echo site_url('publics/js/ie8-responsive-file-warning.js'); ?>"></script><![endif]-->
                <!--[if lt IE 9]>
                  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
                  <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
                <![endif]-->
                <script src="//tinymce.cachefly.net/4.0/tinymce.min.js"></script>
                <link href="<?php echo site_url('publics/frontend/images/apple-touch-icon.png'); ?>" rel="apple-touch-icon" />
                <link href="<?php echo site_url('publics/frontend/images/apple-touch-icon-76x76.png'); ?>" rel="apple-touch-icon" sizes="76x76" />
                <link href="<?php echo site_url('publics/frontend/images/apple-touch-icon-120x120.png'); ?>" rel="apple-touch-icon" sizes="120x120" />
                <link href="<?php echo site_url('publics/frontend/images/apple-touch-icon-152x152.png'); ?>" rel="apple-touch-icon" sizes="152x152" />
                <base id="baseURL" href="<?php echo site_url() ?>"/>
                </head>
                <body>
                    <h1 class="hidden">Hài hước, xem video, video funny, chia sẻ video, bóng đá, sexy girl, tin shock, hướng dẫn quan hệ, tin hot, tình dục, thành công, kỹ năng mềm, kiếm tiền online, hài tết, táo quân, kiếm tiền trên mạng</h1>
                    <div id="fb-root" data-app="<?php echo $app_id; ?>"></div>
                    <div role="navigation" class="navbar navbar-default navbar-fixed-top">
                        <div class="container">
                            <div class="navbar-header">
                                <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <a href="<?php echo site_url(); ?>" class="navbar-brand">123Xem.Vn</a>
                            </div>

                            <div class="navbar-collapse collapse">
                                <div class="navbar-form navbar-left">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Nhập từ khóa" name="srch-term" id="srch-term"/>
                                        <div class="input-group-btn">
                                            <button class="btn btn-default" type="button" id="btnSearch"><i class="glyphicon glyphicon-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="<?php echo site_url('upload'); ?>"><strong class="upload-video"><i class="glyphicon glyphicon-upload"></i> Đăng Video</strong></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo site_url('news'); ?>">Tin tức <img src="<?php echo site_url('publics/frontend/img/hot.gif'); ?>" alt="Tin HOT" /></a>
                                    </li>
                                    <?php if (!loggedin()): ?>
                                        <li><a href="<?php echo site_url('account#register'); ?>">Đăng ký</a></li>
                                    <?php endif; ?>

                                    <?php if (loggedin()): ?>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><?php echo $this->session->userdata('nickname'); ?> <i class="caret"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="<?php echo site_url('uploaded'); ?>">Quản lý video</a></li>
                                                <li><a href="<?php echo site_url('chanel/' . $this->session->userdata('username')); ?>">Kênh của tôi</a></li>
                                                <li><a href="<?php echo site_url('playlist') ?>">Danh sách phát</a></li>
                                                <li><a href="<?php echo site_url('account/profile'); ?>">Sửa thông tin tài khoản</a></li>
                                                <li><a href="<?php echo site_url('account/password'); ?>">Đổi mật khẩu</a></li>
                                                <li><a href="<?php echo site_url('account/logout'); ?>">Thoát</a></li>
                                            </ul>
                                        </li>
                                    <?php else: ?>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Đăng nhập <i class="caret"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="#" class="facebook_login">Kết nối với Facebook</a></li>
                                                <li><a href="<?php echo site_url('account#login'); ?>">Đăng nhập bằng 123Xem.VN</a></li>
                                            </ul>
                                        </li>
                                    <?php endif; ?>
                                </ul>
                            </div><!--/.navbar-collapse -->
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="adv">
                                    <a href="<?php echo site_url('event/cuoi-tha-ga-rinh-qua-tang-cung-123xemvn'); ?>"><img src="<?php echo site_url('publics/adv/advTop.gif'); ?>" class="img-responsive" alt="Cười Thả Ga - Rinh Quà Tặng"/></a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
