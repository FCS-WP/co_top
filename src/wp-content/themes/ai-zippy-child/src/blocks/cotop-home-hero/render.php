<?php

defined('ABSPATH') || exit;

$tagline = $attributes['tagline'] ?? 'Est. 1994 · Singapore';
$title_before = $attributes['titleBefore'] ?? 'Where';
$title_emphasis = $attributes['titleEmphasis'] ?? 'Design';
$title_after = $attributes['titleAfter'] ?? 'Has No Limit';
$description = $attributes['description'] ?? '';
$primary_text = $attributes['primaryText'] ?? '';
$primary_url = $attributes['primaryUrl'] ?? '#';
$secondary_text = $attributes['secondaryText'] ?? '';
$secondary_url = $attributes['secondaryUrl'] ?? '#';
$background_url = $attributes['backgroundUrl'] ?? '';
$stats = is_array($attributes['stats'] ?? null) ? $attributes['stats'] : [
    ['number' => '30+', 'label' => 'Years of Excellence'],
    ['number' => '5', 'label' => 'Premium Brands'],
    ['number' => '1000s', 'label' => 'Projects Completed'],
];

$wrapper = get_block_wrapper_attributes(['class' => 'cth']);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($background_url) : ?>
        <div class="cth__bg" style="background-image:url('<?php echo esc_url($background_url); ?>')"></div>
    <?php else : ?>
        <div class="cth__bg"></div>
    <?php endif; ?>
    <div class="cth__content">
        <?php if ($tagline) : ?>
            <div class="cth__tag"><?php echo esc_html($tagline); ?></div>
        <?php endif; ?>
        <h1 class="cth__title">
            <?php echo esc_html($title_before); ?> <em><?php echo esc_html($title_emphasis); ?></em><br>
            <?php echo esc_html($title_after); ?>
        </h1>
        <?php if ($description) : ?>
            <p class="cth__sub"><?php echo esc_html($description); ?></p>
        <?php endif; ?>
        <div class="cth__actions">
            <?php if ($primary_text) : ?>
                <a class="cth__btn cth__btn--primary" href="<?php echo esc_url($primary_url); ?>"><?php echo esc_html($primary_text); ?></a>
            <?php endif; ?>
            <?php if ($secondary_text) : ?>
                <a class="cth__btn cth__btn--ghost" href="<?php echo esc_url($secondary_url); ?>"><?php echo esc_html($secondary_text); ?></a>
            <?php endif; ?>
        </div>
    </div>
    <?php if (!empty($stats)) : ?>
        <div class="cth__stats">
            <?php foreach ($stats as $stat) : ?>
                <div class="cth__stat">
                    <span class="cth__stat-num"><?php echo esc_html($stat['number'] ?? ''); ?></span>
                    <span class="cth__stat-label"><?php echo esc_html($stat['label'] ?? ''); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
