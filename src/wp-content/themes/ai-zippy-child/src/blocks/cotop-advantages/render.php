<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes(['class' => 'ctadv']);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctadv__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctadv__title"><?php echo esc_html($title); ?></h2>
    <div class="ctadv__grid">
        <?php foreach ($items as $item) : ?>
            <div class="ctadv__item">
                <span class="ctadv__num"><?php echo esc_html($item['number'] ?? ''); ?></span>
                <div class="ctadv__item-title"><?php echo esc_html($item['title'] ?? ''); ?></div>
                <p class="ctadv__body"><?php echo esc_html($item['body'] ?? ''); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
