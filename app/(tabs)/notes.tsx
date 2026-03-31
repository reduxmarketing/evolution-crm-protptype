import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius } from '../../constants/theme';

const CATEGORIES = ['Internal', 'Customer', 'Insurance'];

const RECENT_NOTES = [
  {
    category: 'Internal',
    categoryColor: Colors.primary,
    time: '14 mins ago',
    text: 'Moisture levels in the primary bathroom subfloor remain at 18%. Elevated from yesterday\'s 16.5%. Recommend secondary dehumidifier.',
    attachments: [
      { icon: 'attach-file' as const, label: '2 Photos' },
      { icon: 'person' as const, label: 'A. Miller' },
    ],
  },
  {
    category: 'Insurance',
    categoryColor: Colors.tertiary,
    time: '2 hours ago',
    text: 'Claim #88219: Verified visual signs of Category 3 water intrusion. Documented mold growth behind the baseboard in utility room.',
    attachments: [
      { icon: 'mic' as const, label: 'Voice Memo' },
      { icon: 'person' as const, label: 'M. Chen' },
    ],
  },
];

export default function NotesScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [noteText, setNoteText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcFn_BV06FMQijpXf07nsO_Nba5V0lc0TLWQrkRwuD-uHpGcy6xXEKxQ_QoP-t79GKYYvyn-67BMFEyWwqWNFV8ePCM-duU0CGYgHsXfy09bxpariSQ_Bv_YVOQkKEfwGbjOJ5U4X9mEd2-KksTHEpVvUzwuAG6XtjBqwxzCxSCxoAOmlJfyYEtTvVHopckHoWcIbniH2M1NgGaVceH8i_4BEesoYHAKTQatujWVbbFbopzFtd8f89upRxDBQiFt85XjkA3FtqzFTI' }}
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
        {/* Title */}
        <Text style={styles.screenTitle}>Project Notes</Text>
        <Text style={styles.screenSubtitle}>Capture observations instantly.</Text>

        {/* Category Tabs */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.categoryTab,
                i === activeCategory && styles.categoryTabActive,
              ]}
              onPress={() => setActiveCategory(i)}
            >
              <Text
                style={[
                  styles.categoryText,
                  i === activeCategory && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Tap to start writing or use voice..."
            placeholderTextColor="rgba(67, 70, 86, 0.4)"
            multiline
            value={noteText}
            onChangeText={setNoteText}
            textAlignVertical="top"
          />

          {/* Voice Button */}
          <View style={styles.voiceSection}>
            <TouchableOpacity>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                style={styles.voiceBtn}
              >
                <MaterialIcons name="mic" size={36} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.voiceHint}>TAP FOR VOICE-TO-TEXT</Text>
          </View>
        </View>

        {/* Recent History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent History</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {RECENT_NOTES.map((note, i) => (
          <TouchableOpacity key={i} style={styles.noteCard}>
            <View style={styles.noteTopRow}>
              <View style={styles.noteCategoryRow}>
                <View style={[styles.categoryDot, { backgroundColor: note.categoryColor }]} />
                <Text style={styles.noteCategoryLabel}>{note.category.toUpperCase()}</Text>
              </View>
              <Text style={styles.noteTime}>{note.time}</Text>
            </View>
            <Text style={styles.noteText}>{note.text}</Text>
            <View style={styles.noteAttachments}>
              {note.attachments.map((att, j) => (
                <View key={j} style={styles.attachment}>
                  <MaterialIcons name={att.icon} size={14} color={Colors.onSurfaceVariant} />
                  <Text style={styles.attachmentText}>{att.label}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <View style={styles.fabInner}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
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
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceContainerHigh },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.3 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 24 },
  // Title
  screenTitle: { fontSize: 36, fontWeight: '800', color: Colors.onSurface, letterSpacing: -1.5, marginBottom: 4 },
  screenSubtitle: { fontSize: 17, color: Colors.onSurfaceVariant, marginBottom: 20 },
  // Categories
  categoryRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
  },
  categoryTabActive: { backgroundColor: Colors.primaryContainer },
  categoryText: { fontSize: 14, fontWeight: '600', color: Colors.onSurfaceVariant },
  categoryTextActive: { color: Colors.onPrimaryContainer },
  // Input
  inputContainer: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: 24,
    marginBottom: 32,
    minHeight: 300,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.onSurface,
    minHeight: 160,
    lineHeight: 28,
  },
  voiceSection: { alignItems: 'center', gap: 12, marginTop: 16 },
  voiceBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  voiceHint: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.primary,
  },
  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.onSurface },
  viewAll: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  // Note Cards
  noteCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.md,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  noteTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  noteCategoryRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryDot: { width: 8, height: 8, borderRadius: 4 },
  noteCategoryLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: Colors.onSurfaceVariant },
  noteTime: { fontSize: 10, fontWeight: '500', color: Colors.onSurfaceVariant },
  noteText: { fontSize: 17, fontWeight: '500', color: Colors.onSurface, lineHeight: 24, marginBottom: 16 },
  noteAttachments: { flexDirection: 'row', gap: 16 },
  attachment: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  attachmentText: { fontSize: 11, fontWeight: '700', color: Colors.onSurfaceVariant },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    shadowColor: Colors.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.onSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
