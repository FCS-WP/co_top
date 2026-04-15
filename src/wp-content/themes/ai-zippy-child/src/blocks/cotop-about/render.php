<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$emphasis = $attributes['emphasis'] ?? '';
$body_one = $attributes['bodyOne'] ?? '';
$body_two = $attributes['bodyTwo'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '#';
$main_image_url = $attributes['mainImageUrl'] ?? '';
$inset_image_url = $attributes['insetImageUrl'] ?? '';
$badge_number = $attributes['badgeNumber'] ?? '';
$badge_label = $attributes['badgeLabel'] ?? '';
$wrapper = get_block_wrapper_attributes(['class' => 'ctao']);
?>
<section <?php echo $wrapper; ?>>
    <div class="ctao__grid">
        <div class="ctao__copy">
            <?php if ($label) : ?><div class="ctao__label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <h2 class="ctao__title">
                <?php echo wp_kses_post(nl2br(esc_html($title))); ?>
                <?php if ($emphasis) : ?><br><em><?php echo esc_html($emphasis); ?></em><?php endif; ?>
            </h2>
            <?php if ($body_one) : ?><p class="ctao__body"><?php echo esc_html($body_one); ?></p><?php endif; ?>
            <?php if ($body_two) : ?><p class="ctao__body ctao__body--spaced"><?php echo esc_html($body_two); ?></p><?php endif; ?>
            <?php if ($button_text) : ?><a class="ctao__btn" href="<?php echo esc_url($button_url); ?>"><?php echo esc_html($button_text); ?></a><?php endif; ?>
        </div>
        <div class="ctao__images">
            <?php if ($main_image_url) : ?><img class="ctao__img-main" src="<?php echo esc_url($main_image_url); ?>" alt="" loading="lazy"><?php endif; ?>
            <?php if ($inset_image_url) : ?><img class="ctao__img-inset" src="<?php echo esc_url($inset_image_url); ?>" alt="" loading="lazy"><?php endif; ?>
            <?php if ($badge_number || $badge_label) : ?>
                <div class="ctao__badge"><span class="ctao__badge-num"><?php echo esc_html($badge_number); ?></span><span class="ctao__badge-label"><?php echo esc_html($badge_label); ?></span></div>
            <?php endif; ?>
        </div>
    </div>
</section>
