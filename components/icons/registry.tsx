import type { ComponentType } from "react";

import * as M from "./material-symbols";
import type { IconProps } from "./material-symbols";

/**
 * Name → component map so content files stay serializable (and Sanity-ready).
 * Keys are the Material Symbols names used as layer names in the Figma file.
 */
export const iconRegistry = {
  "9k_plus": M.NineKPlusIcon,
  account_balance: M.AccountBalanceIcon,
  add_chart: M.AddChartIcon,
  alarm: M.AlarmIcon,
  analytics: M.AnalyticsIcon,
  article: M.ArticleIcon,
  assignment: M.AssignmentIcon,
  assured_workload: M.AssuredWorkloadIcon,
  autorenew: M.AutorenewIcon,
  book_4: M.Book4Icon,
  bucket_check: M.BucketCheckIcon,
  cached: M.CachedIcon,
  calculate: M.CalculateIcon,
  cleaning_services: M.CleaningServicesIcon,
  clinical_notes: M.ClinicalNotesIcon,
  contact_phone: M.ContactPhoneIcon,
  contextual_token_add: M.ContextualTokenAddIcon,
  data_check: M.DataCheckIcon,
  database: M.DatabaseIcon,
  deployed_code_account: M.DeployedCodeAccountIcon,
  desktop_windows: M.DesktopWindowsIcon,
  dictionary: M.DictionaryIcon,
  door_open: M.DoorOpenIcon,
  dvr: M.DvrIcon,
  electric_bolt: M.ElectricBoltIcon,
  event_available: M.EventAvailableIcon,
  group: M.GroupIcon,
  group_add: M.GroupAddIcon,
  group_search: M.GroupSearchIcon,
  groups_3: M.Groups3Icon,
  health_and_safety: M.HealthAndSafetyIcon,
  history_2: M.History2Icon,
  home: M.HomeIcon,
  how_to_reg: M.HowToRegIcon,
  import_contacts: M.ImportContactsIcon,
  lock: M.LockIcon,
  money_range: M.MoneyRangeIcon,
  nest_cam_iq_outdoor: M.NestCamIqOutdoorIcon,
  page_info: M.PageInfoIcon,
  paid: M.PaidIcon,
  payments: M.PaymentsIcon,
  person_add: M.PersonAddIcon,
  person_check: M.PersonCheckIcon,
  person_search: M.PersonSearchIcon,
  query_stats: M.QueryStatsIcon,
  receipt_long: M.ReceiptLongIcon,
  rewarded_ads: M.RewardedAdsIcon,
  rocket_launch: M.RocketLaunchIcon,
  search: M.SearchIcon,
  search_check_2: M.SearchCheck2Icon,
  settings: M.SettingsIcon,
  shield_lock: M.ShieldLockIcon,
  /** Not a Material Symbols name: traced from the Hire design (see material-symbols.tsx). */
  shield_person_badge: M.ShieldPersonBadgeIcon,
  sync: M.SyncIcon,
  sync_alt: M.SyncAltIcon,
  track_changes: M.TrackChangesIcon,
  trending_down: M.TrendingDownIcon,
  trending_up: M.TrendingUpIcon,
  verified_user: M.VerifiedUserIcon,
  visibility: M.VisibilityIcon,
  visibility_off: M.VisibilityOffIcon,
} satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof iconRegistry;

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Cmp = iconRegistry[name];
  return <Cmp {...props} />;
}
