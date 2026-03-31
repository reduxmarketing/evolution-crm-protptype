import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius } from '../../constants/theme';

const CONTACT_INFO = [
  { label: 'Email Address', value: 'm.richardson@domain.com' },
  { label: 'Phone Number', value: '+1 (555) 092-8834' },
  { label: 'Primary Address', value: '482 Oakwood Ave, suite 104\nPacific Heights, CA 94115' },
];

const INTERACTIONS = [
  {
    icon: 'mail' as const,
    iconBg: Colors.primaryContainer,
    iconColor: Colors.onPrimaryContainer,
    title: 'Proposal Sent for HVAC Remediation',
    desc: 'Detailed cost breakdown and service timeline sent via automated system.',
    time: 'TODAY \u00B7 10:45 AM',
    showLine: true,
  },
  {
    icon: 'phone' as const,
    iconBg: Colors.secondaryContainer,
    iconColor: Colors.onSecondaryContainer,
    title: 'Call from Customer (Marcus)',
    desc: 'Discussed moisture level readings in the basement. Customer was relieved to see progress.',
    time: 'YESTERDAY \u00B7 4:12 PM',
    showLine: true,
  },
  {
    icon: 'photo-library' as const,
    iconBg: Colors.surfaceContainerHigh,
    iconColor: Colors.onSurfaceVariant,
    title: 'New Inspection Photos Uploaded',
    desc: 'Technician added 12 new photos to Project #8291.',
    time: 'OCT 12 \u00B7 09:30 AM',
    showLine: false,
  },
];

export default function CustomersScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0XavtdD2Q-qaQBd9ADHOJvUWm4UVtb1_gy0L-exb276xIizVR6nYbZn5H7Mhp_2gLvs-zo6oMMLebIedcRAh5-vnoMU-1cJKXeSRAk5upO-DPPSIEdNFtU1Ti-l3u1ooGjehTMvmQKpOoNDnmFqgWkyFLvrjvRoweqOQ-FXqnotnmXKCoHrY8-bK3wV4g02mP8F1UkRBXwtaQlpUOZITOgr8lXyHr6Iv638XFZeSa_T25hKjNAQRXMazvfeEnXyuDStC2twR5DHq9' }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerTitle}>Restoration Intelligence</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color={Colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>PRIORITY CUSTOMER</Text>
        </View>
        <Text style={styles.heroName}>Marcus{'\n'}Richardson</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="edit" size={18} color={Colors.onSurface} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.callBtn}
            >
              <MaterialIcons name="phone" size={18} color="#fff" />
              <Text style={styles.callBtnText}>Call Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        {CONTACT_INFO.map((item, i) => (
          <View key={i} style={styles.contactCard}>
            <Text style={styles.contactLabel}>{item.label.toUpperCase()}</Text>
            <Text style={styles.contactValue}>{item.value}</Text>
          </View>
        ))}

        {/* Active Jobs */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Active Jobs</Text>
          <Text style={styles.sectionMeta}>2 Total Jobs</Text>
        </View>

        {/* Job Card 1 - Water Mitigation */}
        <View style={styles.jobCard}>
          <View style={[styles.statusBlur, { backgroundColor: 'rgba(34,197,94,0.15)' }]} />
          <View style={styles.jobContent}>
            <View style={styles.jobTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobId}>PROJECT #8291</Text>
                <Text style={styles.jobTitle}>Water Mitigation - Basement Flood</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#dcfce7' }]}>
                <Text style={[styles.statusBadgeText, { color: '#166534' }]}>Drying Phase</Text>
              </View>
            </View>
            <View style={styles.metricsRow}>
              <View>
                <Text style={styles.metricLabel}>MOISTURE LEVEL</Text>
                <Text style={styles.metricValue}>18%</Text>
              </View>
              <View style={styles.metricDivider} />
              <View>
                <Text style={styles.metricLabel}>DAILY PROGRESS</Text>
                <Text style={styles.metricValue}>+12%</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.jobBtn}>
              <Text style={styles.jobBtnText}>View Full Report</Text>
              <MaterialIcons name="arrow-forward" size={18} color={Colors.onSurface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Job Card 2 - Mold Remediation */}
        <View style={styles.jobCard}>
          <View style={[styles.statusBlur, { backgroundColor: 'rgba(249,115,22,0.15)' }]} />
          <View style={styles.jobContent}>
            <View style={styles.jobTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobId}>PROJECT #8295</Text>
                <Text style={styles.jobTitle}>Mold Remediation - HVAC</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#ffedd5' }]}>
                <Text style={[styles.statusBadgeText, { color: '#9a3412' }]}>Quotation</Text>
              </View>
            </View>
            <Text style={styles.jobDesc}>
              Awaiting customer approval on estimated cost of $4,250.00 for air duct cleaning and anti-microbial treatment.
            </Text>
            <TouchableOpacity style={styles.jobBtn}>
              <Text style={styles.jobBtnText}>Manage Proposal</Text>
              <MaterialIcons name="arrow-forward" size={18} color={Colors.onSurface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Interaction History */}
        <Text style={[styles.sectionTitle, { marginTop: 32, marginBottom: 16 }]}>
          Interaction History
        </Text>
        <View style={styles.timelineContainer}>
          {INTERACTIONS.map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineIcon, { backgroundColor: item.iconBg }]}>
                  <MaterialIcons name={item.icon} size={16} color={item.iconColor} />
                </View>
                {item.showLine && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineDesc}>{item.desc}</Text>
                <Text style={styles.timelineTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllBtnText}>VIEW ALL INTERACTIONS</Text>
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
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryContainer },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1d4ed8', letterSpacing: -0.3 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 24 },
  // Hero
  heroBadge: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 8,
  },
  heroBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: Colors.onSecondaryContainer },
  heroName: { fontSize: 44, fontWeight: '800', color: Colors.onSurface, letterSpacing: -2, lineHeight: 48, marginBottom: 20 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 52,
    paddingHorizontal: 24,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 12,
  },
  editBtnText: { fontSize: 14, fontWeight: '700', color: Colors.onSurface },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  callBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  // Contact
  contactCard: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 24,
    borderRadius: BorderRadius.md,
    marginBottom: 12,
  },
  contactLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: Colors.onSurfaceVariant, marginBottom: 6 },
  contactValue: { fontSize: 17, fontWeight: '700', color: Colors.onSurface, lineHeight: 24 },
  // Section
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.3 },
  sectionMeta: { fontSize: 13, fontWeight: '700', color: Colors.onSurfaceVariant },
  // Job Card
  jobCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.md,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.onSurface,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 3,
  },
  statusBlur: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  jobContent: { padding: 24 },
  jobTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  jobId: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: Colors.onSurfaceVariant, marginBottom: 4 },
  jobTitle: { fontSize: 20, fontWeight: '700', color: Colors.onSurface, lineHeight: 26 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full },
  statusBadgeText: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  metricsRow: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingVertical: 16 },
  metricLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 2, color: Colors.onSurfaceVariant },
  metricValue: { fontSize: 24, fontWeight: '900', color: Colors.onSurface, marginTop: 2 },
  metricDivider: { width: 1, height: 32, backgroundColor: 'rgba(195,197,217,0.3)' },
  jobDesc: { fontSize: 14, color: Colors.onSurfaceVariant, lineHeight: 22, paddingVertical: 12 },
  jobBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 12,
    marginTop: 16,
  },
  jobBtnText: { fontSize: 14, fontWeight: '700', color: Colors.onSurface },
  // Timeline
  timelineContainer: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.md,
    padding: 20,
    marginBottom: 4,
  },
  timelineLeft: { alignItems: 'center' },
  timelineIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  timelineLine: { width: 2, flex: 1, backgroundColor: 'rgba(195,197,217,0.3)', marginTop: 8 },
  timelineContent: { flex: 1, gap: 4 },
  timelineTitle: { fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  timelineDesc: { fontSize: 13, color: Colors.onSurfaceVariant, lineHeight: 20 },
  timelineTime: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: Colors.onSurfaceVariant, marginTop: 8 },
  viewAllBtn: { alignItems: 'center', paddingVertical: 16 },
  viewAllBtnText: { fontSize: 13, fontWeight: '700', color: Colors.primary, letterSpacing: 1.5 },
});
