<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes([
    'id' => 'our-services',
    'class' => 'ctsvc',
]);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctsvc__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctsvc__title"><?php echo esc_html($title); ?></h2>
    <?php if ($body) : ?><p class="ctsvc__intro"><?php echo esc_html($body); ?></p><?php endif; ?>
    <div class="ctsvc__grid">
        <?php foreach ($items as $item) : ?>
            <div class="ctsvc__box"><div class="ctsvc__tag"><?php echo esc_html($item['tag'] ?? ''); ?></div><h4><?php echo esc_html($item['title'] ?? ''); ?></h4><p><?php echo esc_html($item['body'] ?? ''); ?></p></div>
        <?php endforeach; ?>
    </div>
</section>
