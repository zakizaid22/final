/**
 * Meta Marketing API Google Apps Script integration for pulling daily insights with metadata enrichment.
 * Generated for Google Sheet named \"Your Google Sheet name\".
 */

const SHEET_NAME = 'Your Google Sheet name';
const GRAPH_VERSION = 'v17.0';
const DAYS_BACK_FULL = 60;
const DAYS_BACK_INCREMENTAL = 3;
const PLATFORM_NAME = 'Facebook';
const BASE_URL = 'https://graph.facebook.com/';
const DEFAULT_ACCESS_TOKEN = 'YOUR_LONG_LIVED_SYSTEM_USER_TOKEN';
const OPTIONAL_FIELDS = [
  'cpm',
  'cpc',
  'ctr',
  'unique_clicks',
  'unique_ctr',
  'inline_link_clicks',
  'unique_inline_link_clicks',
  'outbound_clicks',
  'unique_outbound_clicks',
  'website_ctr',
  'video_play_actions',
  'video_p25_watched_actions',
  'video_p50_watched_actions',
  'video_p75_watched_actions',
  'video_p95_watched_actions',
  'video_p100_watched_actions',
  'video_continuous_2_sec_watched_actions',
  'video_avg_time_watched_actions',
  'video_thruplay_watched_actions',
  'instant_experience_clicks_to_open',
  'instant_experience_clicks_to_start',
  'instant_experience_outbound_clicks',
  'instant_experience_impressions',
  'instant_experience_reach',
  'instant_experience_view_time',
  'instant_experience_view_percentage',
  'estimated_ad_recall_lift',
  'estimated_ad_recall_rate',
  'cost_per_estimated_ad_recall_lift',
  'actions',
  'action_values',
  'gross_impressions',
  'auto_refresh_impressions'
];

const INSIGHTS_BASE_FIELDS = [
  'date_start',
  'date_stop',
  'account_id',
  'account_name',
  'campaign_id',
  'campaign_name',
  'adset_id',
  'adset_name',
  'ad_id',
  'ad_name',
  'impressions',
  'reach',
  'frequency',
  'clicks',
  'spend',
  'cpm',
  'cpc',
  'ctr',
  'unique_clicks',
  'unique_ctr',
  'inline_link_clicks',
  'unique_inline_link_clicks',
  'outbound_clicks',
  'unique_outbound_clicks',
  'website_ctr',
  'video_play_actions',
  'video_p25_watched_actions',
  'video_p50_watched_actions',
  'video_p75_watched_actions',
  'video_p95_watched_actions',
  'video_p100_watched_actions',
  'video_continuous_2_sec_watched_actions',
  'video_avg_time_watched_actions',
  'video_thruplay_watched_actions',
  'instant_experience_clicks_to_open',
  'instant_experience_clicks_to_start',
  'instant_experience_outbound_clicks',
  'instant_experience_impressions',
  'instant_experience_reach',
  'instant_experience_view_time',
  'instant_experience_view_percentage',
  'estimated_ad_recall_lift',
  'estimated_ad_recall_rate',
  'cost_per_estimated_ad_recall_lift',
  'actions',
  'action_values',
  'gross_impressions',
  'auto_refresh_impressions'
];

const FB_DATA_BASE_COLUMNS = [
  'date',
  'platform',
  'account_id',
  'account_name',
  'campaign_id',
  'campaign_name',
  'adset_id',
  'adset_name',
  'ad_id',
  'ad_name',
  'ad_effective_status',
  'adset_effective_status',
  'tags',
  'ad_created_time',
  'ad_updated_time',
  'adset_created_time',
  'adset_updated_time',
  'campaign_created_time',
  'campaign_updated_time',
  'starts',
  'ends',
  'reporting_starts',
  'reporting_ends',
  'time_elapsed_pct',
  'ad_schedule',
  'amount_spent',
  'amount_spent_pct',
  'cpm',
  'cpc_all',
  'ctr_all',
  'budget',
  'budget_remaining',
  'bid_strategy',
  'buying_type',
  'campaign_spending_limit',
  'objective',
  'performance_goal',
  'attribution_setting',
  'conversion_location',
  'delivery',
  'impressions',
  'gross_impressions',
  'auto_refresh_impressions',
  'reach',
  'frequency',
  'clicks_all',
  'unique_clicks_all',
  'link_clicks',
  'unique_link_clicks',
  'outbound_clicks',
  'unique_outbound_clicks',
  'ctr_link',
  'ctr_outbound',
  'unique_ctr_all',
  'unique_ctr_link',
  'cost_per_outbound_click',
  'cost_per_unique_click_all',
  'cost_per_unique_link_click',
  'cost_per_unique_outbound_click',
  'cpc_link',
  'estimated_ad_recall_lift_people',
  'estimated_ad_recall_rate',
  'cost_per_estimated_ad_recall_lift',
  'ix_clicks_to_open',
  'ix_clicks_to_start',
  'ix_outbound_clicks',
  'ix_impressions',
  'ix_reach',
  'ix_view_time',
  'ix_view_pct',
  'video_3s_plays',
  'video_25',
  'video_50',
  'video_75',
  'video_95',
  'video_100',
  'video_2s_continuous',
  'video_avg_play_time',
  'thruplays',
  'unique_2s_continuous',
  'video_3s_plays_rate_per_impressions',
  'lpv_rate_per_link_clicks',
  'purchases_rate_per_landing_page_views',
  'purchases_rate_per_link_clicks',
  'purchases',
  'purchase_value',
  'leads',
  'results',
  'results_value',
  'results_roAS',
  'result_rate',
  'cost_per_result',
  'result_rate_per_link_clicks',
  'views',
  'video_plays',
  'audience_age',
  'audience_gender',
  'audience_location',
  'included_custom_audiences',
  'excluded_custom_audiences'
];

const FB_BREAKDOWN_COLUMNS = {
  'FB_AGE_GENDER': ['date', 'platform', 'account_id', 'campaign_id', 'adset_id', 'ad_id', 'age', 'gender', 'impressions', 'reach', 'clicks', 'spend', 'purchases', 'leads', 'ctr', 'cpc', 'cpm'],
  'FB_REGION': ['date', 'platform', 'account_id', 'campaign_id', 'adset_id', 'ad_id', 'region', 'impressions', 'reach', 'clicks', 'spend', 'purchases', 'leads', 'ctr', 'cpc', 'cpm'],
  'FB_COUNTRY': ['date', 'platform', 'account_id', 'campaign_id', 'adset_id', 'ad_id', 'country', 'impressions', 'reach', 'clicks', 'spend', 'purchases', 'leads', 'ctr', 'cpc', 'cpm']
};

const ACTIONS_CONFIG_DEFAULT_ROWS = [
  ['metric_name', 'action_types (csv)', 'include_value (TRUE/FALSE)'],
  ['landing_page_views', 'landing_page_view,omni_landing_page_view', 'FALSE'],
  ['messaging_conversations_started', 'messaging_conversation_started,onsite_conversion.messaging_first_reply', 'FALSE'],
  ['check_ins', 'checkin', 'FALSE'],
  ['event_responses', 'event_response', 'FALSE'],
  ['join_group_requests', 'join_group_request', 'FALSE'],
  ['page_likes', 'like', 'FALSE'],
  ['page_engagement', 'page_engagement', 'FALSE'],
  ['photo_views', 'photo_view', 'FALSE'],
  ['post_comments', 'comment', 'FALSE'],
  ['post_reactions', 'post_reaction', 'FALSE'],
  ['post_shares', 'post_share', 'FALSE'],
  ['post_engagements', 'post_engagement', 'FALSE'],
  ['instagram_profile_visits', 'profile_visit,instagram_profile_visit', 'FALSE'],
  ['shop_clicks', 'shop_first_click,shop_action', 'FALSE'],
  ['leads', 'lead,omni_lead,on_facebook_lead,leadgen.grouped,onsite_conversion.lead_grouped', 'FALSE'],
  ['purchases', 'purchase,omni_purchase', 'TRUE'],
  ['add_to_cart', 'add_to_cart,omni_add_to_cart,onsite_conversion.add_to_cart', 'FALSE'],
  ['initiate_checkout', 'initiate_checkout,omni_initiated_checkout,onsite_conversion.initiated_checkout', 'FALSE'],
  ['content_views', 'view_content,omni_view_content,onsite_conversion.view_content', 'FALSE'],
  ['subscriptions', 'subscribe,omni_subscribe', 'TRUE'],
  ['results', 'purchase,omni_purchase', 'TRUE']
];

/**
 * Adds a custom menu for convenience.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Meta Marketing API')
    .addItem('Run full refresh', 'RUN_FULL_REFRESH')
    .addItem('Run daily incremental', 'RUN_DAILY')
    .addItem('Install daily trigger (06:00)', 'installDailyTrigger')
    .addSeparator()
    .addItem('List ad accounts', 'LIST_AD_ACCOUNTS')
    .addItem('Test token', 'TEST_TOKEN')
    .addToUi();
}

function RUN_FULL_REFRESH() {
  const config = ensureAndGetConfig_();
  ensureActionsConfig_();
  const dateRange = getDateRange_(DAYS_BACK_FULL);
  const factRows = fetchFactsForRange_(config, dateRange.since, dateRange.until);
  writeFactTables_(factRows, true);
  refreshBreakdowns_(config, dateRange.since, dateRange.until, true);
}

function RUN_DAILY() {
  const config = ensureAndGetConfig_();
  ensureActionsConfig_();
  const dateRange = getDateRange_(DAYS_BACK_INCREMENTAL);
  const factRows = fetchFactsForRange_(config, dateRange.since, dateRange.until);
  writeFactTables_(factRows, false, dateRange);
  refreshBreakdowns_(config, dateRange.since, dateRange.until, false);
}

function installDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'RUN_DAILY') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('RUN_DAILY').timeBased().atHour(6).everyDays(1).create();
}

function LIST_AD_ACCOUNTS() {
  const config = ensureAndGetConfig_();
  const url = buildUrl_('me/adaccounts', {
    fields: 'id,name,account_status',
    limit: 500
  }, config.accessToken);
  const response = apiRequestWithRetry_(url);
  const data = response.data || [];
  Logger.log('Ad Accounts (%s):', data.length);
  data.forEach(item => Logger.log('%s - %s (status: %s)', item.id, item.name, item.account_status));
}

function TEST_TOKEN() {
  const config = ensureAndGetConfig_();
  const url = buildUrl_('me', { fields: 'id,name' }, config.accessToken);
  const response = apiRequestWithRetry_(url);
  Logger.log('Token valid for %s (%s)', response.name, response.id);
}

function fetchFactsForRange_(config, since, until) {
  const actionsConfig = getActionsConfig_();
  const factColumns = getFactColumns_(actionsConfig);
  const rows = [];
  config.accountIds.forEach(accountId => {
    const entityMaps = fetchEntityMaps_(accountId, config.accessToken);
    const insights = fetchInsightsWithFieldFallback_(accountId, config.accessToken, INSIGHTS_BASE_FIELDS.slice(), buildInsightsParams_(config, since, until));
    insights.forEach(record => {
      const row = buildFactRow_(record, entityMaps, actionsConfig, factColumns);
      if (row) {
        rows.push(row);
      }
    });
  });
  rows.sort((a, b) => a[0].getTime() - b[0].getTime());
  return rows;
}

function writeFactTables_(rows, clearExisting, range) {
  const actionsConfig = getActionsConfig_();
  const columns = getFactColumns_(actionsConfig);
  const sheets = getWorkbookSheets_();
  const factSheet = sheets.FB_DATA;
  const factAllSheet = sheets.FACT_ALL;
  if (clearExisting) {
    factSheet.clearContents();
    factAllSheet.clearContents();
  } else if (range) {
    removeRowsByDate_(factSheet, range.since, range.until);
    removeRowsByDate_(factAllSheet, range.since, range.until);
  }
  writeTable_(factSheet, columns, rows, !clearExisting || factSheet.getLastRow() === 0);
  writeTable_(factAllSheet, columns, rows, !clearExisting || factAllSheet.getLastRow() === 0);
}

function refreshBreakdowns_(config, since, until, clearExisting) {
  const sheets = getWorkbookSheets_();
  const ageGenderRows = fetchBreakdownRows_(config, 'age,gender', since, until);
  writeBreakdown_(sheets.FB_AGE_GENDER, 'FB_AGE_GENDER', ageGenderRows, clearExisting);
  const regionRows = fetchBreakdownRows_(config, 'region', since, until);
  writeBreakdown_(sheets.FB_REGION, 'FB_REGION', regionRows, clearExisting);
  const countryRows = fetchBreakdownRows_(config, 'country', since, until);
  writeBreakdown_(sheets.FB_COUNTRY, 'FB_COUNTRY', countryRows, clearExisting);
}

function fetchBreakdownRows_(config, breakdownParam, since, until) {
  const actionsConfig = getActionsConfig_();
  const rows = [];
  config.accountIds.forEach(accountId => {
    const fields = ['date_start', 'date_stop', 'account_id', 'campaign_id', 'adset_id', 'ad_id', 'impressions', 'reach', 'clicks', 'spend', 'ctr', 'cpc', 'cpm', 'actions'];
    const params = buildInsightsParams_(config, since, until);
    params.breakdowns = breakdownParam;
    params.level = 'ad';
    const records = fetchInsightsWithFieldFallback_(accountId, config.accessToken, fields.slice(), params);
    records.forEach(record => {
      const metricData = extractActionMetrics_(record.actions, null, actionsConfig).metrics;
      const base = [dateFromYYYYMMDD_(record.date_start), PLATFORM_NAME, record.account_id, record.campaign_id, record.adset_id, record.ad_id];
      let breakdownSpecific = [];
      if (breakdownParam === 'age,gender') {
        breakdownSpecific = [record.age || '', record.gender || ''];
      } else if (breakdownParam === 'region') {
        breakdownSpecific = [record.region || ''];
      } else if (breakdownParam === 'country') {
        breakdownSpecific = [record.country || ''];
      }
      const impressions = toNumber_(record.impressions);
      const reach = toNumber_(record.reach);
      const clicks = toNumber_(record.clicks);
      const spend = toNumber_(record.spend);
      const purchases = (metricData.purchases && metricData.purchases.count) || 0;
      const leads = (metricData.leads && metricData.leads.count) || 0;
      const ctr = toNumber_(record.ctr);
      const cpc = toNumber_(record.cpc);
      const cpm = toNumber_(record.cpm);
      rows.push(base.concat(breakdownSpecific, [impressions, reach, clicks, spend, purchases, leads, ctr, cpc, cpm]));
    });
  });
  rows.sort((a, b) => a[0].getTime() - b[0].getTime());
  return rows;
}

function writeBreakdown_(sheet, key, rows, clearExisting) {
  const columns = FB_BREAKDOWN_COLUMNS[key];
  if (clearExisting) {
    sheet.clearContents();
  }
  writeTable_(sheet, columns, rows, !clearExisting || sheet.getLastRow() === 0);
}

function buildInsightsParams_(config, since, until) {
  const params = {
    time_increment: 1,
    level: 'ad',
    time_range: JSON.stringify({ since: since, until: until })
  };
  if (config.attribution === 'use_unified') {
    params.use_unified_attribution_setting = true;
  } else if (config.attribution) {
    params.action_attribution_windows = config.attribution;
  }
  return params;
}

function ensureAndGetConfig_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('FB_CONFIG') || ss.insertSheet('FB_CONFIG');
  if (sheet.getLastRow() < 2) {
    sheet.clear();
    sheet.getRange(1, 1, 1, 3).setValues([[ 'fb_access_token', 'ad_account_ids', 'attribution' ]]);
    sheet.getRange(2, 1, 1, 3).setValues([[ DEFAULT_ACCESS_TOKEN, 'act_123456789', 'use_unified' ]]);
  }
  return getConfig_();
}

function ensureActionsConfig_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('ACTIONS_CONFIG');
  if (!sheet) {
    sheet = ss.insertSheet('ACTIONS_CONFIG');
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, ACTIONS_CONFIG_DEFAULT_ROWS.length, ACTIONS_CONFIG_DEFAULT_ROWS[0].length).setValues(ACTIONS_CONFIG_DEFAULT_ROWS);
  }
}

function getConfig_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('FB_CONFIG');
  if (!sheet) {
    throw new Error('FB_CONFIG sheet missing.');
  }
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((header, idx) => {
    if (header) {
      map[header] = values[idx];
    }
  });
  const token = (map.fb_access_token || '').trim();
  const accountIds = (map.ad_account_ids || '').split(',').map(id => id.trim()).filter(Boolean);
  if (!token) {
    throw new Error('fb_access_token required in FB_CONFIG.');
  }
  if (!accountIds.length) {
    throw new Error('ad_account_ids required in FB_CONFIG.');
  }
  const attribution = (map.attribution || 'use_unified').trim() || 'use_unified';
  return {
    accessToken: token,
    accountIds: accountIds,
    attribution: attribution
  };
}

function getActionsConfig_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('ACTIONS_CONFIG');
  if (!sheet || sheet.getLastRow() < 2) {
    return [];
  }
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
  return values.filter(row => row[0]).map(row => ({
    metricName: String(row[0]).trim(),
    actionTypes: String(row[1] || '').split(',').map(type => type.trim()).filter(Boolean),
    includeValue: String(row[2]).toUpperCase() === 'TRUE'
  }));
}

function getWorkbookSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const names = ['FB_DATA', 'FACT_ALL', 'FB_AGE_GENDER', 'FB_REGION', 'FB_COUNTRY'];
  const result = {};
  names.forEach(name => {
    result[name] = ss.getSheetByName(name) || ss.insertSheet(name);
  });
  return result;
}

function fetchEntityMaps_(accountId, accessToken) {
  return {
    ads: fetchEntityList_(accountId, 'ads', accessToken),
    adsets: fetchEntityList_(accountId, 'adsets', accessToken),
    campaigns: fetchEntityList_(accountId, 'campaigns', accessToken)
  };
}

function fetchEntityList_(accountId, entity, accessToken) {
  const fieldsMap = {
    ads: 'id,name,effective_status,created_time,updated_time,adlabels{name}',
    adsets: 'id,name,effective_status,created_time,updated_time,start_time,end_time,daily_budget,lifetime_budget,budget_remaining,bid_strategy,attribution_spec,optimization_goal,promoted_object,destination_type,targeting',
    campaigns: 'id,name,objective,buying_type,spend_cap,created_time,updated_time'
  };
  const url = buildUrl_(accountId + '/' + entity, { fields: fieldsMap[entity], limit: 500 }, accessToken);
  const map = {};
  let nextUrl = url;
  while (nextUrl) {
    const response = apiRequestWithRetry_(nextUrl);
    (response.data || []).forEach(item => {
      map[item.id] = item;
    });
    nextUrl = response.paging && response.paging.next;
    if (nextUrl) {
      Utilities.sleep(200);
    }
  }
  return map;
}

function buildFactRow_(record, entityMaps, actionsConfig, factColumns) {
  const ad = entityMaps.ads[record.ad_id] || {};
  const adset = entityMaps.adsets[record.adset_id] || {};
  const campaign = entityMaps.campaigns[record.campaign_id] || {};
  const actionData = extractActionMetrics_(record.actions, record.action_values, actionsConfig);
  const metrics = actionData.metrics;
  const spend = toNumber_(record.spend);
  const impressions = toNumber_(record.impressions);
  const clicks = toNumber_(record.clicks);
  const reach = toNumber_(record.reach);
  const frequency = toNumber_(record.frequency);
  const grossImpressions = toNumber_(record.gross_impressions);
  const autoRefreshImpressions = toNumber_(record.auto_refresh_impressions);
  const inlineLinkClicks = toNumber_(record.inline_link_clicks);
  const uniqueInlineLinkClicks = toNumber_(record.unique_inline_link_clicks);
  const outboundClicks = sumInsightsActionArray_(record.outbound_clicks);
  const uniqueOutboundClicks = sumInsightsActionArray_(record.unique_outbound_clicks);
  const uniqueClicks = toNumber_(record.unique_clicks);
  const ctr = toNumber_(record.ctr);
  const uniqueCtr = toNumber_(record.unique_ctr);
  const cpm = toNumber_(record.cpm);
  const delivery = buildDeliveryStatus_(ad.effective_status, adset.effective_status);
  const budget = determineBudget_(adset);
  const budgetRemaining = convertMinorUnits_(adset.budget_remaining);
  const amountSpentPct = safeDivide_(spend, budget);
  const ctrLink = safeDivide_(inlineLinkClicks, impressions);
  const ctrOutbound = safeDivide_(outboundClicks, impressions);
  const uniqueCtrLink = safeDivide_(uniqueInlineLinkClicks, impressions);
  const costPerOutboundClick = safeDivide_(spend, outboundClicks);
  const costPerUniqueClickAll = safeDivide_(spend, uniqueClicks);
  const costPerUniqueLinkClick = safeDivide_(spend, uniqueInlineLinkClicks);
  const costPerUniqueOutboundClick = safeDivide_(spend, uniqueOutboundClicks);
  const cpcLink = safeDivide_(spend, inlineLinkClicks);
  const ixClicksToOpen = toNumber_(record.instant_experience_clicks_to_open);
  const ixClicksToStart = toNumber_(record.instant_experience_clicks_to_start);
  const ixOutboundClicks = toNumber_(record.instant_experience_outbound_clicks);
  const ixImpressions = toNumber_(record.instant_experience_impressions);
  const ixReach = toNumber_(record.instant_experience_reach);
  const ixViewTime = toNumber_(record.instant_experience_view_time);
  const ixViewPct = toNumber_(record.instant_experience_view_percentage);
  const videoMetrics = extractVideoMetrics_(record);
  metrics.thruplays = metrics.thruplays || { count: videoMetrics.thruplays, value: 0 };
  if (!metrics.thruplays.count) {
    metrics.thruplays.count = videoMetrics.thruplays;
  }
  const purchases = (metrics.purchases && metrics.purchases.count) || 0;
  const purchaseValue = (metrics.purchases && metrics.purchases.value) || 0;
  const leads = (metrics.leads && metrics.leads.count) || 0;
  const landingPageViews = (metrics.landing_page_views && metrics.landing_page_views.count) || 0;
  const resultsMetricKey = determineResultsMetric_(adset, campaign);
  ensureMetricPresence_(metrics, resultsMetricKey);
  if (resultsMetricKey === 'thruplays') {
    metrics.thruplays.count = videoMetrics.thruplays;
  }
  const resultsMetric = metrics[resultsMetricKey] || { count: 0, value: 0 };
  const resultsCount = resultsMetric.count || 0;
  const resultsValue = resultsMetric.value || 0;
  const resultsRoas = safeDivide_(resultsValue, spend);
  const resultRate = safeDivide_(resultsCount, impressions);
  const costPerResult = safeDivide_(spend, resultsCount);
  const resultRatePerLinkClicks = safeDivide_(resultsCount, inlineLinkClicks);
  const video3sRate = safeDivide_(videoMetrics.video_3s_plays, impressions);
  const lpvRatePerLink = safeDivide_(landingPageViews, inlineLinkClicks);
  const purchasesRatePerLPV = safeDivide_(purchases, landingPageViews);
  const purchasesRatePerLink = safeDivide_(purchases, inlineLinkClicks);
  const estimatedRecall = toNumber_(record.estimated_ad_recall_lift);
  const estimatedRecallRate = toNumber_(record.estimated_ad_recall_rate);
  const costPerEstimatedRecall = toNumber_(record.cost_per_estimated_ad_recall_lift);
  const date = dateFromYYYYMMDD_(record.date_start);
  const reportingStart = dateFromYYYYMMDD_(record.date_start);
  const reportingEnd = dateFromYYYYMMDD_(record.date_stop);
  const startDate = parseDate_(adset.start_time);
  const endDate = parseDate_(adset.end_time);
  const timeElapsedPct = calculateTimeElapsed_(date, startDate, endDate);
  const attributionSetting = formatAttributionSpec_(adset.attribution_spec);
  const conversionLocation = buildConversionLocation_(adset);
  const tags = buildAdLabels_(ad.adlabels);
  const audienceAge = buildAudienceAge_(adset.targeting);
  const audienceGender = buildAudienceGender_(adset.targeting);
  const audienceLocation = buildAudienceLocation_(adset.targeting);
  const includedAudiences = buildAudienceList_(adset.targeting && adset.targeting.custom_audiences);
  const excludedAudiences = buildAudienceList_(adset.targeting && adset.targeting.excluded_custom_audiences);
  const rowMap = {
    date: date,
    platform: PLATFORM_NAME,
    account_id: record.account_id,
    account_name: record.account_name,
    campaign_id: record.campaign_id,
    campaign_name: record.campaign_name,
    adset_id: record.adset_id,
    adset_name: record.adset_name,
    ad_id: record.ad_id,
    ad_name: record.ad_name,
    ad_effective_status: ad.effective_status || '',
    adset_effective_status: adset.effective_status || '',
    tags: tags,
    ad_created_time: parseDate_(ad.created_time),
    ad_updated_time: parseDate_(ad.updated_time),
    adset_created_time: parseDate_(adset.created_time),
    adset_updated_time: parseDate_(adset.updated_time),
    campaign_created_time: parseDate_(campaign.created_time),
    campaign_updated_time: parseDate_(campaign.updated_time),
    starts: startDate,
    ends: endDate,
    reporting_starts: reportingStart,
    reporting_ends: reportingEnd,
    time_elapsed_pct: timeElapsedPct,
    ad_schedule: buildAdSchedule_(adset.start_time, adset.end_time),
    amount_spent: spend,
    amount_spent_pct: amountSpentPct,
    cpm: cpm,
    cpc_all: safeDivide_(spend, clicks),
    ctr_all: ctr,
    budget: budget,
    budget_remaining: budgetRemaining,
    bid_strategy: adset.bid_strategy || '',
    buying_type: campaign.buying_type || '',
    campaign_spending_limit: convertMinorUnits_(campaign.spend_cap),
    objective: campaign.objective || '',
    performance_goal: adset.optimization_goal || '',
    attribution_setting: attributionSetting,
    conversion_location: conversionLocation,
    delivery: delivery,
    impressions: impressions,
    gross_impressions: grossImpressions,
    auto_refresh_impressions: autoRefreshImpressions,
    reach: reach,
    frequency: frequency,
    clicks_all: clicks,
    unique_clicks_all: uniqueClicks,
    link_clicks: inlineLinkClicks,
    unique_link_clicks: uniqueInlineLinkClicks,
    outbound_clicks: outboundClicks,
    unique_outbound_clicks: uniqueOutboundClicks,
    ctr_link: ctrLink,
    ctr_outbound: ctrOutbound,
    unique_ctr_all: uniqueCtr,
    unique_ctr_link: uniqueCtrLink,
    cost_per_outbound_click: costPerOutboundClick,
    cost_per_unique_click_all: costPerUniqueClickAll,
    cost_per_unique_link_click: costPerUniqueLinkClick,
    cost_per_unique_outbound_click: costPerUniqueOutboundClick,
    cpc_link: cpcLink,
    estimated_ad_recall_lift_people: estimatedRecall,
    estimated_ad_recall_rate: estimatedRecallRate,
    cost_per_estimated_ad_recall_lift: costPerEstimatedRecall,
    ix_clicks_to_open: ixClicksToOpen,
    ix_clicks_to_start: ixClicksToStart,
    ix_outbound_clicks: ixOutboundClicks,
    ix_impressions: ixImpressions,
    ix_reach: ixReach,
    ix_view_time: ixViewTime,
    ix_view_pct: ixViewPct,
    video_3s_plays: videoMetrics.video_3s_plays,
    video_25: videoMetrics.video_25,
    video_50: videoMetrics.video_50,
    video_75: videoMetrics.video_75,
    video_95: videoMetrics.video_95,
    video_100: videoMetrics.video_100,
    video_2s_continuous: videoMetrics.video_2s_continuous,
    video_avg_play_time: videoMetrics.video_avg_play_time,
    thruplays: videoMetrics.thruplays,
    unique_2s_continuous: videoMetrics.unique_2s_continuous,
    video_3s_plays_rate_per_impressions: video3sRate,
    lpv_rate_per_link_clicks: lpvRatePerLink,
    purchases_rate_per_landing_page_views: purchasesRatePerLPV,
    purchases_rate_per_link_clicks: purchasesRatePerLink,
    purchases: purchases,
    purchase_value: purchaseValue,
    leads: leads,
    results: resultsCount,
    results_value: resultsValue,
    results_roAS: resultsRoas,
    result_rate: resultRate,
    cost_per_result: costPerResult,
    result_rate_per_link_clicks: resultRatePerLinkClicks,
    views: impressions,
    video_plays: videoMetrics.video_3s_plays,
    audience_age: audienceAge,
    audience_gender: audienceGender,
    audience_location: audienceLocation,
    included_custom_audiences: includedAudiences,
    excluded_custom_audiences: excludedAudiences
  };
  const row = factColumns.map(column => {
    if (rowMap.hasOwnProperty(column)) {
      return rowMap[column];
    }
    if (column.indexOf('_value') > -1) {
      const metricKey = column.replace(/_value$/, '');
      return (metrics[metricKey] && metrics[metricKey].value) || 0;
    }
    if (metrics[column]) {
      return metrics[column].count || 0;
    }
    return 0;
  });
  return row;
}

function ensureMetricPresence_(metrics, key) {
  if (!metrics[key]) {
    metrics[key] = { count: 0, value: 0 };
  }
}

function extractActionMetrics_(actions, actionValues, actionsConfig) {
  const metrics = {};
  const actionMap = {};
  const valueMap = {};
  (actions || []).forEach(item => {
    if (item && item.action_type) {
      const type = item.action_type;
      const value = toNumber_(item.value);
      actionMap[type] = (actionMap[type] || 0) + value;
    }
  });
  (actionValues || []).forEach(item => {
    if (item && item.action_type) {
      const type = item.action_type;
      const value = toNumber_(item.value);
      valueMap[type] = (valueMap[type] || 0) + value;
    }
  });
  actionsConfig.forEach(config => {
    let count = 0;
    let value = 0;
    config.actionTypes.forEach(type => {
      count += actionMap[type] || 0;
      if (config.includeValue) {
        value += valueMap[type] || 0;
      }
    });
    metrics[config.metricName] = { count: count, value: value };
  });
  return { metrics: metrics, actionMap: actionMap, valueMap: valueMap };
}

function extractVideoMetrics_(record) {
  return {
    video_3s_plays: sumActionField_(record.video_play_actions),
    video_25: sumActionField_(record.video_p25_watched_actions),
    video_50: sumActionField_(record.video_p50_watched_actions),
    video_75: sumActionField_(record.video_p75_watched_actions),
    video_95: sumActionField_(record.video_p95_watched_actions),
    video_100: sumActionField_(record.video_p100_watched_actions),
    video_2s_continuous: sumActionField_(record.video_continuous_2_sec_watched_actions),
    video_avg_play_time: sumActionField_(record.video_avg_time_watched_actions),
    thruplays: sumActionField_(record.video_thruplay_watched_actions),
    unique_2s_continuous: sumActionField_(record.video_continuous_2_sec_watched_actions, true)
  };
}

function determineResultsMetric_(adset, campaign) {
  const optimizationGoal = (adset.optimization_goal || '').toUpperCase();
  const objective = (campaign.objective || '').toUpperCase();
  if (optimizationGoal.indexOf('LEAD') > -1) {
    return 'leads';
  }
  if (optimizationGoal.indexOf('LANDING_PAGE_VIEW') > -1) {
    return 'landing_page_views';
  }
  if (optimizationGoal.indexOf('MESSAG') > -1) {
    return 'messaging_conversations_started';
  }
  if (optimizationGoal.indexOf('VALUE') > -1 || optimizationGoal.indexOf('PURCHASE') > -1 || optimizationGoal.indexOf('CONVERSION') > -1 || optimizationGoal.indexOf('SALE') > -1) {
    return 'purchases';
  }
  if (objective === 'LEAD_GENERATION') {
    return 'leads';
  }
  if (objective === 'TRAFFIC' || objective === 'LINK_CLICKS') {
    return 'landing_page_views';
  }
  if (objective === 'CONVERSIONS' || objective === 'SALES' || objective === 'OUTCOME_SALES' || objective === 'CATALOG_SALES') {
    return 'purchases';
  }
  if (objective === 'MESSAGES') {
    return 'messaging_conversations_started';
  }
  if (objective === 'VIDEO_VIEWS') {
    return 'thruplays';
  }
  return 'purchases';
}

function buildDeliveryStatus_(adStatus, adsetStatus) {
  if (!adStatus && !adsetStatus) {
    return '';
  }
  return ['Ad: ' + (adStatus || 'unknown'), 'AdSet: ' + (adsetStatus || 'unknown')].join(' | ');
}

function convertMinorUnits_(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  return toNumber_(value) / 100;
}

function determineBudget_(adset) {
  if (!adset) {
    return '';
  }
  if (adset.lifetime_budget) {
    return convertMinorUnits_(adset.lifetime_budget);
  }
  if (adset.daily_budget) {
    return convertMinorUnits_(adset.daily_budget);
  }
  return '';
}

function formatAttributionSpec_(spec) {
  if (!spec) {
    return '';
  }
  if (Array.isArray(spec)) {
    return JSON.stringify(spec);
  }
  return String(spec);
}

function buildConversionLocation_(adset) {
  if (!adset) {
    return '';
  }
  const parts = [];
  if (adset.destination_type) {
    parts.push(adset.destination_type);
  }
  if (adset.promoted_object) {
    if (adset.promoted_object.custom_event_type) {
      parts.push('custom_event:' + adset.promoted_object.custom_event_type);
    }
    if (adset.promoted_object.pixel_id) {
      parts.push('pixel:' + adset.promoted_object.pixel_id);
    }
  }
  return parts.join(' | ');
}

function buildAdLabels_(labels) {
  if (!labels || !labels.length) {
    return '';
  }
  return labels.map(label => label.name || '').filter(Boolean).join(', ');
}

function buildAudienceAge_(targeting) {
  if (!targeting) {
    return '';
  }
  const min = targeting.age_min || '';
  const max = targeting.age_max || '';
  if (!min && !max) {
    return '';
  }
  return [min || 'any', max || 'any'].join('-');
}

function buildAudienceGender_(targeting) {
  if (!targeting || !targeting.genders || !targeting.genders.length) {
    return 'all';
  }
  const mapping = { 1: 'male', 2: 'female' };
  const genders = targeting.genders.map(g => mapping[g] || g).filter(Boolean);
  if (!genders.length || genders.length === 2) {
    return 'all';
  }
  return genders.join(', ');
}

function buildAudienceLocation_(targeting) {
  if (!targeting || !targeting.geo_locations) {
    return '';
  }
  const geo = targeting.geo_locations;
  if (geo.countries && geo.countries.length) {
    return 'Countries: ' + geo.countries.join(', ');
  }
  if (geo.regions && geo.regions.length) {
    return 'Regions: ' + geo.regions.map(r => r.name || r.key || '').join(', ');
  }
  if (geo.cities && geo.cities.length) {
    return 'Cities: ' + geo.cities.map(c => c.name || '').join(', ');
  }
  return '';
}

function buildAudienceList_(audiences) {
  if (!audiences || !audiences.length) {
    return '';
  }
  return audiences.map(a => a.name || a.id || '').filter(Boolean).join(', ');
}

function sumInsightsActionArray_(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    return 0;
  }
  return arr.reduce((sum, item) => sum + toNumber_(item.value), 0);
}

function sumActionField_(arr, uniqueOnly) {
  if (!Array.isArray(arr) || !arr.length) {
    return 0;
  }
  return arr.reduce((sum, item) => {
    if (uniqueOnly && item.breakdown_value && item.breakdown_value !== 'unique') {
      return sum;
    }
    return sum + toNumber_(item.value);
  }, 0);
}

function calculateTimeElapsed_(date, start, end) {
  if (!date || !start || !end) {
    return '';
  }
  const total = end.getTime() - start.getTime();
  if (total <= 0) {
    return '';
  }
  const elapsed = Math.min(Math.max(date.getTime() - start.getTime(), 0), total);
  return safeDivide_(elapsed, total) * 100;
}

function parseDate_(value) {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return '';
  }
  return date;
}

function dateFromYYYYMMDD_(value) {
  if (!value) {
    return '';
  }
  const parts = value.split('-');
  if (parts.length !== 3) {
    return '';
  }
  return new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
}

function toNumber_(value) {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function safeDivide_(numerator, denominator) {
  numerator = toNumber_(numerator);
  denominator = toNumber_(denominator);
  if (!denominator) {
    return 0;
  }
  return numerator / denominator;
}

function getDateRange_(daysBack) {
  const tz = Session.getScriptTimeZone();
  const today = new Date();
  const todayStr = Utilities.formatDate(today, tz, 'yyyy-MM-dd');
  const end = dateFromYYYYMMDD_(todayStr);
  const start = new Date(end.getTime());
  start.setUTCDate(start.getUTCDate() - (daysBack - 1));
  const since = Utilities.formatDate(start, tz, 'yyyy-MM-dd');
  const until = Utilities.formatDate(end, tz, 'yyyy-MM-dd');
  return { since: since, until: until };
}

function getFactColumns_(actionsConfig) {
  const columns = FB_DATA_BASE_COLUMNS.slice();
  actionsConfig.forEach(config => {
    if (columns.indexOf(config.metricName) === -1) {
      columns.push(config.metricName);
    }
    if (config.includeValue) {
      const valueColumn = config.metricName + '_value';
      if (columns.indexOf(valueColumn) === -1) {
        columns.push(valueColumn);
      }
    }
  });
  return columns;
}

function writeTable_(sheet, headers, rows, append) {
  if (!append) {
    sheet.clearContents();
  }
  let startRow = append && sheet.getLastRow() > 0 ? sheet.getLastRow() + 1 : 1;
  if (startRow === 1) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    startRow = 2;
  }
  if (rows.length) {
    sheet.getRange(startRow, 1, rows.length, headers.length).setValues(rows);
  }
}

function removeRowsByDate_(sheet, since, until) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return;
  }
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const sinceDate = dateFromYYYYMMDD_(since);
  const untilDate = dateFromYYYYMMDD_(until);
  const rowsToDelete = [];
  values.forEach((row, idx) => {
    const cell = row[0];
    if (cell instanceof Date) {
      if (cell.getTime() >= sinceDate.getTime() && cell.getTime() <= untilDate.getTime()) {
        rowsToDelete.push(idx + 2);
      }
    }
  });
  rowsToDelete.reverse().forEach(rowIndex => sheet.deleteRow(rowIndex));
}

function buildAdSchedule_(start, end) {
  if (!start && !end) {
    return '';
  }
  const tz = Session.getScriptTimeZone();
  const startStr = start ? Utilities.formatDate(new Date(start), tz, "yyyy-MM-dd'T'HH:mm:ss") : '';
  const endStr = end ? Utilities.formatDate(new Date(end), tz, "yyyy-MM-dd'T'HH:mm:ss") : '';
  return (startStr || 'unknown') + ' → ' + (endStr || 'ongoing');
}

function buildUrl_(path, params, accessToken) {
  const query = Object.assign({}, params || {});
  if (accessToken) {
    query.access_token = accessToken;
  }
  const queryString = Object.keys(query).map(key => key + '=' + encodeURIComponent(query[key])).join('&');
  return BASE_URL + GRAPH_VERSION + '/' + path + (queryString ? '?' + queryString : '');
}

function fetchInsightsWithFieldFallback_(accountId, accessToken, fields, params) {
  while (true) {
    try {
      return fetchInsights_(accountId, accessToken, fields, params);
    } catch (error) {
      const invalid = parseInvalidFields_(error);
      if (!invalid.length) {
        throw error;
      }
      let removed = false;
      invalid.forEach(field => {
        if (OPTIONAL_FIELDS.indexOf(field) > -1 && fields.indexOf(field) > -1) {
          fields.splice(fields.indexOf(field), 1);
          removed = true;
        }
      });
      if (!removed) {
        throw error;
      }
    }
  }
}

function fetchInsights_(accountId, accessToken, fields, params) {
  const base = buildUrl_(accountId + '/insights', Object.assign({}, params, {
    fields: fields.join(','),
    limit: 500
  }), accessToken);
  let url = base;
  const results = [];
  while (url) {
    const response = apiRequestWithRetry_(url);
    (response.data || []).forEach(item => results.push(item));
    url = response.paging && response.paging.next;
    if (url) {
      Utilities.sleep(250);
    }
  }
  return results;
}

function parseInvalidFields_(error) {
  const message = (error && error.message) || (error && error.body) || '';
  if (!message) {
    return [];
  }
  const matches = message.match(/(?:fields?|field)[:\s]+([^\.]+)/i);
  if (!matches || !matches[1]) {
    return [];
  }
  return matches[1].split(',').map(f => f.replace(/[^A-Za-z0-9_]/g, '').trim()).filter(Boolean);
}

function apiRequestWithRetry_(url) {
  const maxRetries = 5;
  let attempt = 0;
  while (attempt <= maxRetries) {
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      muteHttpExceptions: true
    });
    const status = response.getResponseCode();
    const text = response.getContentText();
    let body = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch (err) {
      body = {};
    }
    if (status >= 200 && status < 300) {
      return body;
    }
    const error = body.error || {};
    if (shouldRetry_(status, error) && attempt < maxRetries) {
      attempt++;
      Utilities.sleep(Math.pow(2, attempt) * 500);
      continue;
    }
    const err = new Error((error && error.message) || 'API error: ' + status);
    err.code = status;
    err.message = err.message + ' | body=' + text;
    throw err;
  }
  throw new Error('Failed to fetch after retries: ' + url);
}

function shouldRetry_(status, error) {
  if (status >= 500 && status < 600) {
    return true;
  }
  if (status === 429) {
    return true;
  }
  const code = error && error.code;
  return code === 4 || code === 17 || code === 32;
}

function getRangeDates_(range) {
  if (!range) {
    return null;
  }
  return {
    since: dateFromYYYYMMDD_(range.since),
    until: dateFromYYYYMMDD_(range.until)
  };
}

function setup_() {
  ensureAndGetConfig_();
  ensureActionsConfig_();
  getWorkbookSheets_();
}
