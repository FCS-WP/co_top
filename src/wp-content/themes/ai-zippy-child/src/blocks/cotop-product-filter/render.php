<?php

defined('ABSPATH') || exit;

$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes(['class' => 'ctpf']);
?>
<div <?php echo $wrapper; ?>>
    <?php foreach ($items as $index => $item) : ?>
        <button class="ctpf__btn <?php echo $index === 0 ? 'is-active' : ''; ?>" type="button" data-target="<?php echo esc_attr($item['target'] ?? 'all'); ?>"><?php echo esc_html($item['label'] ?? ''); ?></button>
    <?php endforeach; ?>
</div>
