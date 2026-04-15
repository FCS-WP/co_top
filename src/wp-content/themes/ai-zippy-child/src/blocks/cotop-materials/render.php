<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$intro = $attributes['intro'] ?? '';
$cards = is_array($attributes['cards'] ?? null) ? $attributes['cards'] : [];
$wrapper = get_block_wrapper_attributes(['class' => 'ctmat']);
?>
<section <?php echo $wrapper; ?>>
    <div class="ctmat__intro">
        <div>
            <?php if ($label) : ?><div class="ctmat__label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <h2 class="ctmat__title"><?php echo wp_kses_post(nl2br(esc_html($title))); ?></h2>
        </div>
        <?php if ($intro) : ?><p><?php echo esc_html($intro); ?></p><?php endif; ?>
    </div>
    <div class="ctmat__grid">
        <?php foreach ($cards as $card) : ?>
            <a class="ctmat__card" href="<?php echo esc_url($card['url'] ?? '#'); ?>">
                <div class="ctmat__img-wrap">
                    <img class="ctmat__img" src="<?php echo esc_url($card['image'] ?? ''); ?>" alt="<?php echo esc_attr($card['name'] ?? ''); ?>" loading="lazy">
                </div>
                <div class="ctmat__info">
                    <div class="ctmat__type"><?php echo esc_html($card['type'] ?? ''); ?></div>
                    <div class="ctmat__name"><?php echo esc_html($card['name'] ?? ''); ?></div>
                    <p class="ctmat__desc"><?php echo esc_html($card['desc'] ?? ''); ?></p>
                    <div class="ctmat__price">
                        <span class="ctmat__price-from">From</span>
                        <span class="ctmat__price-amount"><?php echo esc_html($card['from'] ?? ''); ?></span>
                        <span class="ctmat__price-unit"><?php echo esc_html($card['unit'] ?? ''); ?></span>
                        <span class="ctmat__price-note"><?php echo esc_html($card['note'] ?? ''); ?></span>
                    </div>
                    <span class="ctmat__link">Explore Collection <span>→</span></span>
                </div>
            </a>
        <?php endforeach; ?>
    </div>
</section>
