<?php

defined('ABSPATH') || exit;

$background_word = $attributes['backgroundWord'] ?? '';
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '#';
$wrapper = get_block_wrapper_attributes(['class' => 'ctcta']);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($background_word) : ?><div class="ctcta__bg-word"><?php echo esc_html($background_word); ?></div><?php endif; ?>
    <?php if ($label) : ?><div class="ctcta__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctcta__title"><?php echo esc_html($title); ?></h2>
    <?php if ($body) : ?><p class="ctcta__body"><?php echo esc_html($body); ?></p><?php endif; ?>
    <?php if ($button_text) : ?><a class="ctcta__btn" href="<?php echo esc_url($button_url); ?>"><?php echo esc_html($button_text); ?></a><?php endif; ?>
</section>
