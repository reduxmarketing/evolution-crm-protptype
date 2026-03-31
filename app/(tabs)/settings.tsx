import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius } from '../../constants/theme';

const NOTIFICATION_PREFS = [
  {
    icon: 'sms' as const,
    title: 'SMS Notifications',
    desc: 'Urgent dispatch alerts',
    defaultOn: true,
    bg: Colors.surfaceContainerLowest,
    iconBg: Colors.surfaceContainerLow,
  },
  {
    icon: 'mail' as const,
    title: 'Email Updates',
    desc: 'Daily job summaries',
    defaultOn: true,
    bg: Colors.surfaceContainerLow,
    iconBg: Colors.surfaceContainerLowest,
  },
  {
    icon: 'notifications-active' as const,
    title: 'In-App Toggles',
    desc: 'Real-time status changes',
    defaultOn: false,
    bg: Colors.surfaceContainerLowest,
    iconBg: Colors.surfaceContainerLow,
  },
];

const SECURITY_ITEMS = [
  { icon: 'lock' as const, title: 'Change Password', value: '' },
  { icon: 'fingerprint' as const, title: 'Biometric Authentication', value: 'On' },
  { icon: 'devices' as const, title: 'Managed Devices', value: '' },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState(
    NOTIFICATION_PREFS.map((p) => p.defaultOn)
  );

  const handleToggle = (index: number) => {
    setToggles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUX3Du3Riz5uGQyJl8GjKJO5qXEyAFw4Ke8c_5Pg8vy8Z2aqTSk2GTeQW65OS6tjSxrlL8YmbfAeKJxYLC5VLbTOVxAG7mKXaPn-T9Cfu2Mi40rLd7cheaYNFs6Zh_FQhY4wwJ1MFr3cJBmZiBSgdBLYZ_dgV7nfrrKGp_PCZMv1ni0d9lhjjOFpj-ZZjs_uaucOjcvh_YmYznN-r80uBBOK06rQlZSU_VCJam5vROH16abSDBA8pkkSjb6608YekF5K1Qj1Lqm8S' }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerTitle}>Restoration Intelligence</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color="#1d4ed8" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSfrdNcbo2T5pEOVyt4Vujw2o8N_j5xI1ImtnC0T7G5ctJZIBuSd5ESsR8FTN9qBnJDS03vTRKeO3oSV4Sy7h9it7v9fqMgc7myNrovMCu5WGd-XuJ8_F__vmK5JdQ2se6BZUU1aQ-GmsS2Bp3vYt0qkfBBQc0BrTyFRp2SSVnyJt2AbMq-7OmoCSM_QVwTbIY7MSYHSQ7acyu3qMcaf0wqLZR7o9G-CFP7KppQD3px72Wv0usA7t18pY0QruwJoGf1-ir0S2Hqnjr' }}
              style={styles.profileAvatar}
            />
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={12} color="#fff" />
            </View>
          </View>
          <Text style={styles.profileName}>Alex Smith</Text>
          <Text style={styles.profileRole}>Project Manager</Text>
          <View style={styles.badgeRow}>
            <View style={styles.statusBadge}>
              <Text style={[styles.statusBadgeText, { color: Colors.primary }]}>ACTIVE DUTY</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={[styles.statusBadgeText, { color: Colors.onSurfaceVariant }]}>LEVEL 4 CERT</Text>
            </View>
          </View>
        </View>

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={{ gap: 12, marginBottom: 32 }}>
          {NOTIFICATION_PREFS.map((pref, i) => (
            <View key={i} style={[styles.prefCard, { backgroundColor: pref.bg }]}>
              <View style={styles.prefLeft}>
                <View style={[styles.prefIcon, { backgroundColor: pref.iconBg }]}>
                  <MaterialIcons name={pref.icon} size={22} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.prefTitle}>{pref.title}</Text>
                  <Text style={styles.prefDesc}>{pref.desc}</Text>
                </View>
              </View>
              <Switch
                value={toggles[i]}
                onValueChange={() => handleToggle(i)}
                trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primary }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Account Security */}
        <Text style={styles.sectionTitle}>Account Security</Text>
        <View style={styles.securityContainer}>
          {SECURITY_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.securityItem,
                i < SECURITY_ITEMS.length - 1 && styles.securityItemBorder,
              ]}
            >
              <View style={styles.securityLeft}>
                <MaterialIcons name={item.icon} size={22} color={Colors.onSurfaceVariant} />
                <Text style={styles.securityText}>{item.title}</Text>
              </View>
              <View style={styles.securityRight}>
                {item.value ? (
                  <Text style={styles.securityValue}>{item.value}</Text>
                ) : null}
                <MaterialIcons name="chevron-right" size={22} color={Colors.outlineVariant} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Support</Text>
        <View style={styles.supportGrid}>
          <TouchableOpacity style={styles.supportCard}>
            <MaterialIcons name="help" size={28} color={Colors.primary} />
            <Text style={styles.supportTitle}>Help Center</Text>
            <Text style={styles.supportDesc}>Knowledge base & FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportCardPrimary}>
            <MaterialIcons name="contact-support" size={28} color="#fff" />
            <Text style={styles.supportTitlePrimary}>Live Chat</Text>
            <Text style={styles.supportDescPrimary}>24/7 Field Assistance</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn}>
          <MaterialIcons name="logout" size={20} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out of Account</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 2,
    borderColor: 'rgba(0,67,200,0.2)',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.3 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 24 },
  // Profile
  profileSection: { alignItems: 'center', marginBottom: 40, marginTop: 8 },
  avatarContainer: { position: 'relative', marginBottom: 20 },
  profileAvatar: { width: 120, height: 120, borderRadius: BorderRadius.md },
  editBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  profileName: { fontSize: 28, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: 2 },
  profileRole: { fontSize: 15, fontWeight: '500', color: Colors.onSurfaceVariant, marginBottom: 16 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.full,
  },
  statusBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  // Section
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.3, marginBottom: 16, paddingHorizontal: 8 },
  // Prefs
  prefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: BorderRadius.md,
  },
  prefLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  prefIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefTitle: { fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  prefDesc: { fontSize: 13, color: Colors.onSurfaceVariant, marginTop: 2 },
  // Security
  securityContainer: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: 8,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  securityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  securityLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  securityText: { fontSize: 15, fontWeight: '500', color: Colors.onSurface },
  securityRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  securityValue: { fontSize: 11, fontWeight: '700', color: Colors.primary, letterSpacing: 1.5, textTransform: 'uppercase' },
  // Support
  supportGrid: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  supportCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: 24,
    gap: 12,
  },
  supportTitle: { fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  supportDesc: { fontSize: 11, color: Colors.onSurfaceVariant },
  supportCardPrimary: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: 24,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  supportTitlePrimary: { fontSize: 15, fontWeight: '700', color: '#fff' },
  supportDescPrimary: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  // Sign Out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    paddingVertical: 20,
  },
  signOutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
});
