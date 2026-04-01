import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius } from '../../constants/theme';

const CATEGORIES = ['Before', 'During', 'After', 'Damage Assessment'];

const PHOTOS = [
  {
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC-t2NFpg3Jt4BG8Z6BjHi6xTyc-c4SPwfZQ3moXXt4Yw2p6etWyjR_2NM_Z4srYOHKjdYYB9RWP-ZPYPnY196iwxZe9ZXViUSvKAk9-AHeEVjGrVcLAuDlPtnrriK6xjdgTTyZt5-OXGAMfcxc4LEsPBeEm8gh3jDwtbKXiq7WtpVXOcDnRBmw2Fw7U77j0IXGkiijtx2auHIKIunT68V03ZjMPTXyDrSPfZZizt16foLk1e6NUaV52llAgi-qcjRl4vtuChYzFm4',
    label: 'Before',
    title: 'Initial Entry Scan',
    wide: true,
  },
  {
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHhNZhClaKSntVlp-sUZKt483B6GeMY6CkCDmUqzXW_i8cljy5gosUlM4AQy4-aJtk4gP4rU7IKNLlrhM0z3cStWeC8sV_-AJyXH1fSJw-5S2X-I2hY8fujUy-lV-TbEoq3GofMEElzyefpycM-MaPUtNytktaCkQ561sBYHwg3b2LbDLvmHLs2MxVTVFBDBBq7iTASpouRPtE0zIcBdbLVJW8gSxJd0ZplTN8YVWSe5OjD1S_jcQlQ5g37LpZLLOvO0Tf7qkngNIo',
    label: 'Damage',
    title: 'Baseboard Mold Check',
    wide: false,
  },
  {
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgycWT2u12nTWxuHnhNevdP2U-j1AMxCDwL9939ORNYjPDkhpidwCAj_EL6bZ-RV5zFaP5920rfM_9-rPAqJPgelC6CtO_IABhbWJ4kRr8__1K9wSoKB-pEW_M18jT5NlETduTh-MQslmv0xJ9vMkiQBnEnur5EYUz5nsNZz5R7PhtzvMHX678g2egeAwGvZLCEDGw3Mpuchkl-GV5rqr2vjCasrKyl_0oBQPqsalXLOg2ESAjivf0lxt95SPMwmLmRRiDNjOCbn-H',
    label: 'Before',
    title: 'Ceiling Leak Point',
    wide: false,
  },
  {
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaq13UXQwXOEF3STuor3U9iT5xotcEdnDmgrGrTkfAopWg2qtYAAZ-g1mtlNCA3b0YJ1tdU5Mr1vb9sR8gE9HEpsO2nUIUfCiX6-rjCfY0wMQprdKuKv4JME-sSAwQUUgsUQ5UesUzfmuxTa9v8JBO1NSGN9DA4ZtprTn1ZhZjP45AUG--to962-7yUekqpjOFMtMErarTr0BJ6HTOe49vqOROobTWPSKgwkoSqTz6rHOz1ayjPJiZhJwQJbmCSLbwj7UVEbmjl595',
    label: 'Assessment',
    title: 'Moisture Level 82%',
    wide: false,
  },
];

const screenWidth = Dimensions.get('window').width;

export default function PhotosScreen() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOw2HPSumQ4FttlHjTTyDFX7Iv6k7yl94iG9DNpUTLJ1ztA2-5Bj7N57-lBnKyNf3A0u-SMIlgyx77PdKQmTiQvNxQ12GNpCTnW5jcHNMR8ELlLglJw3w2_Q67uFjp-U_sX2vT0hvb_bR3LlBkuCWuxXjG_k2galU2V35EbkOQ_TBCTkv9ft2aPZZ1jhnPX6P9SLRFRfYq_M5jK4II2Z2jO749Kud_rA-EXjF5T1gEHxXdN_xbqP2r1hhECYOhiQPbhW29ldqwCAEv' }}
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
        {/* Project Header */}
        <View style={styles.projectMeta}>
          <MaterialIcons name="business" size={14} color={Colors.onSurfaceVariant} />
          <Text style={styles.projectLabel}>PROJECT ID</Text>
        </View>
        <Text style={styles.projectTitle}>#RI-8829 - Smith Residence</Text>
        <Text style={styles.projectSubtitle}>Water Damage Mitigation - Living Area</Text>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
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
        </ScrollView>

        {/* Bulk Upload */}
        <TouchableOpacity style={styles.uploadBtn}>
          <View style={styles.uploadIcon}>
            <MaterialIcons name="cloud-upload" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.uploadText}>Bulk Upload Photos</Text>
        </TouchableOpacity>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {/* Wide photo */}
          <TouchableOpacity style={styles.photoWide}>
            <Image source={{ uri: PHOTOS[0].uri }} style={styles.photoImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.photoOverlay}
            />
            <View style={styles.photoLabel}>
              <Text style={styles.photoLabelCat}>{PHOTOS[0].label}</Text>
              <Text style={styles.photoLabelTitle}>{PHOTOS[0].title}</Text>
            </View>
            <TouchableOpacity style={styles.photoEditBtn}>
              <MaterialIcons name="edit" size={14} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Grid row */}
          <View style={styles.photoRow}>
            {PHOTOS.slice(1, 3).map((photo, i) => (
              <TouchableOpacity key={i} style={styles.photoSquare}>
                <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.photoOverlay}
                />
                <View style={styles.photoLabel}>
                  <Text style={styles.photoLabelCat}>{photo.label}</Text>
                  <Text style={styles.photoLabelTitleSm}>{photo.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom row */}
          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.photoSquare}>
              <Image source={{ uri: PHOTOS[3].uri }} style={styles.photoImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.photoOverlay}
              />
              <View style={styles.photoLabel}>
                <Text style={styles.photoLabelCat}>{PHOTOS[3].label}</Text>
                <Text style={styles.photoLabelTitleSm}>{PHOTOS[3].title}</Text>
              </View>
            </TouchableOpacity>
            {/* Quick Snap placeholder */}
            <TouchableOpacity style={styles.quickSnap}>
              <MaterialIcons name="add-a-photo" size={24} color={Colors.onSurfaceVariant} />
              <Text style={styles.quickSnapText}>Quick Snap</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryContainer]}
          style={styles.fabGradient}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </LinearGradient>
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
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primaryFixed },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.3 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 24 },
  // Project Header
  projectMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  projectLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: Colors.onSurfaceVariant },
  projectTitle: { fontSize: 24, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.5 },
  projectSubtitle: { fontSize: 14, color: Colors.onSurfaceVariant, fontStyle: 'italic', marginTop: 4, marginBottom: 20 },
  // Categories
  categoryRow: { gap: 10, paddingBottom: 4, marginBottom: 24 },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryText: { fontSize: 14, fontWeight: '700', color: Colors.onSurfaceVariant },
  categoryTextActive: { color: Colors.onPrimary },
  // Upload
  uploadBtn: {
    height: 80,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,67,200,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  // Photo Grid
  photoGrid: { gap: 10, maxWidth: 500 },
  photoWide: {
    width: '100%',
    aspectRatio: 2,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    maxHeight: 200,
  },
  photoRow: { flexDirection: 'row', gap: 10 },
  photoSquare: {
    flex: 1,
    aspectRatio: 1.2,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    maxHeight: 160,
  },
  photoImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  photoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' },
  photoLabel: { position: 'absolute', bottom: 12, left: 12 },
  photoLabelCat: { fontSize: 9, fontWeight: '700', letterSpacing: 2, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  photoLabelTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  photoLabelTitleSm: { fontSize: 12, fontWeight: '700', color: '#fff' },
  photoEditBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickSnap: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  quickSnapText: { fontSize: 12, fontWeight: '700', color: Colors.onSurfaceVariant },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    shadowColor: Colors.onSurface,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
