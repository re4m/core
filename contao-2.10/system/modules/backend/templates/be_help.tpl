<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>">
<head>
<meta charset="<?php echo $this->charset; ?>">
<title><?php echo $this->title; ?> - Contao Open Source CMS <?php echo VERSION; ?></title>
<base href="<?php echo $this->base; ?>">
<link rel="stylesheet" href="<?php
  $objCombiner = new Combiner();
  $objCombiner->add('system/themes/'. $this->theme .'/basic.css');
  $objCombiner->add('system/themes/'. $this->theme .'/help.css');
  echo $objCombiner->getCombinedFile();
?>" media="all">
<!--[if lt IE 8]><link rel="stylesheet" href="<?php echo TL_SCRIPT_URL; ?>system/themes/<?php echo $this->theme; ?>/iefixes.css?<?php echo VERSION .'.'. BUILD; ?>" media="screen"><![endif]-->
<!--[if gt IE 7]><link rel="stylesheet" href="<?php echo TL_SCRIPT_URL; ?>system/themes/<?php echo $this->theme; ?>/ie8fixes.css?<?php echo VERSION .'.'. BUILD; ?>" media="screen"><![endif]-->
</head>
<body class="{{ua::class}}">

<div id="container">
<div id="main">

<h1><?php echo $this->helpWizard; ?></h1>

<h2><?php echo $this->headline; ?></h2>

<?php echo $this->explanation; ?>
<?php if (count($this->rows)): ?>
<table class="tl_help_table">
<?php foreach ($this->rows as $row): ?>
  <tr>
<?php if ($row[0] == 'colspan'): ?>
    <td colspan="2"><?php echo $row[1]; ?></td>
<?php else: ?>
    <td class="tl_label"><?php echo $row[0]; ?></td>
    <td><?php echo $row[1]; ?></td>
<?php endif; ?>
  </tr>
<?php endforeach; ?>
</table>
<?php endif; ?>

</div>
</div>

</body>
</html>