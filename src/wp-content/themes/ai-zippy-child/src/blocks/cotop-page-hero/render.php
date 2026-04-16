<?php

defined('ABSPATH') || exit;

$tagline = $attributes['tagline'] ?? '';
$title = $attributes['title'] ?? '';
$emphasis = $attributes['emphasis'] ?? '';
$body = $attributes['body'] ?? '';
$note = $attributes['note'] ?? '';
$background_url = $attributes['backgroundUrl'] ?? '';
$wrapper = get_block_wrapper_attributes(['class' => 'ctph']);
?>
<section <?php echo $wrapper; ?>>
    <div class="ctph__bg" style="background-image:url('<?php echo esc_url($background_url); ?>')"></div>
    <div class="ctph__content">
        <?php if ($tagline) : ?><div class="ctph__tag"><?php echo esc_html($tagline); ?></div><?php endif; ?>
        <h1 class="ctph__title"><?php echo esc_html($title); ?><br><em><?php echo esc_html($emphasis); ?></em></h1>
        <?php if ($body) : ?><p class="ctph__body"><?php echo esc_html($body); ?></p><?php endif; ?>
        <?php if ($note) : ?><p class="ctph__note"><?php echo esc_html($note); ?></p><?php endif; ?>
    </div>
</section>
