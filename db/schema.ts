import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const predictions = sqliteTable('predictions', { userId: text('user_id').primaryKey(), payload: text('payload').notNull(), updatedAt: text('updated_at').notNull() });
export const peakSessions = sqliteTable('peak_sessions', { matchId:text('match_id').primaryKey(), openedAt:text('opened_at').notNull(), closesAt:text('closes_at').notNull(), closedAt:text('closed_at') });
export const peakPredictions = sqliteTable('peak_predictions', { id:text('id').primaryKey(), userId:text('user_id').notNull(), matchId:text('match_id').notNull(), payload:text('payload').notNull(), submittedAt:text('submitted_at').notNull() });
export const loginDevices = sqliteTable('login_devices', { id:text('id').primaryKey(), userId:text('user_id').notNull(), deviceId:text('device_id').notNull(), label:text('label').notNull(), createdAt:text('created_at').notNull(), lastSeenAt:text('last_seen_at').notNull() });
export const microPredictions = sqliteTable('micro_predictions', { id:text('id').primaryKey(), userId:text('user_id').notNull(), matchId:text('match_id').notNull(), seq:text('seq').notNull(), payload:text('payload').notNull(), submittedAt:text('submitted_at').notNull() });

export const battleCache=sqliteTable("battle_cache",{id:text("id").primaryKey(),payload:text("payload").notNull(),fetchedAt:text("fetched_at").notNull()});
export const microWindows=sqliteTable("micro_windows",{id:text("id").primaryKey(),startedAt:text("started_at").notNull(),evidence:text("evidence").notNull()});
