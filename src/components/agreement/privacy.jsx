import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const emailAddress = 'developer@hunyutech.com';
    const platformName = ref('Agent云平台')
    return () => {
      return (
        <div class="min-h-screen bg-white text-gray-800">
          <main class="container mx-auto px-6 pt-32 pb-20">
            <section class="mb-16 text-center">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                隐私协议
              </h1>
            </section>
            
            <article class="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
              <section class="mb-8">
                <p class="text-lg leading-relaxed mb-6">
                  { platformName.vue }（简称"我们"）由杭州魂域科技有限公司运营，我们深知个人信息对您的重要性，您的信任对我们至关重要。我们将严格遵守相关法律法规，并参照行业最佳实践，保护您的个人信息及隐私安全。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息，请您在使用{ platformName.vue }及相关服务前仔细阅读并理解本政策。
                </p>
                
                <div class="mb-8">
                  <h2 class="text-2xl font-bold mb-4 text-gray-900">本隐私协议将帮助您了解：</h2>
                  <ol class="list-decimal list-inside space-y-2 ml-4">
                    <li>我们如何收集和使用您的个人信息</li>
                    <li>我们如何使用Cookie等同类技术</li>
                    <li>数据使用过程中涉及的合作方及信息转移</li>
                    <li>我们如何存储您的个人信息</li>
                    <li>我们如何保护您的个人信息安全</li>
                    <li>您如何行使个人信息权利</li>
                    <li>未成年人隐私保护</li>
                    <li>隐私政策的修订和通知</li>
                    <li>联系我们</li>
                  </ol>
                </div>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">1. 我们如何收集和使用您的个人信息</h2>
                
                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">1.1 注册与登录</h3>
                  <p class="mb-4">
                    当您注册或登录{ platformName.vue }时，我们会收集您的手机号码或第三方账号信息（如微信、Apple ID等），以便为您创建账户并提供服务。手机号码是履行国家法律法规关于网络实名制要求的必要信息，如果您拒绝提供，可能无法使用部分功能。
                  </p>
                  <p class="mb-4">
                    您的个人信息（如头像、昵称）、历史对话记录、个人资产（如智能体）等账号资料信息会在{ platformName.vue }网页端和{ platformName.vue } APP之间进行同步，您注册本产品的账号会同时成为使用统一账号服务的通行标识，可以同步登录、使用上述所有关联产品，获得相关服务，无须单独重新注册。本账号注销、封号情况等也会在统一账号服务下保持联动。
                  </p>
                </div>

                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">1.2 服务功能</h3>
                  <p class="mb-4">在使用{ platformName.vue }的过程中，我们可能会根据功能需要收集您的以下信息：</p>
                  <ul class="list-disc list-inside space-y-3 ml-4">
                    <li><strong>文字输入：</strong>当您通过对话框与{ platformName.vue }互动时，我们会收集您输入的文字内容，以便为您提供相关服务。</li>
                    <li><strong>图片与文件：</strong>如果您上传图片或文件，我们会请求您授权相册或文件访问权限，以实现相关功能。</li>
                    <li><strong>语音输入功能：</strong>当您使用语音指令与{ platformName.vue }交互时，我们会申请麦克风权限并收集语音内容用于语音助手、指令识别等核心功能。若涉及声纹等生物识别信息处理，将通过独立弹窗明确告知数据用途、存储期限（不超过服务终止后180天），并需您完成短信验证码二次确认后启用。</li>
                    <li>
                      <strong>视频分析功能：</strong>如您使用视频分析功能，需授权摄像头权限。我们将收集您上传或实时拍摄的视频流数据用于场景识别、内容解析等操作。若视频包含地理坐标等精确位置信息：
                      <ol class="list-decimal list-inside mt-2 ml-4 space-y-1">
                        <li>实时定位场景下，每24小时触发动态授权弹窗更新许可</li>
                        <li>采用差分隐私技术将坐标模糊至500米半径区域</li>
                        <li>原始地理位置数据在完成场景分析后24小时内自动删除</li>
                      </ol>
                    </li>
                  </ul>

                  <div class="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6">
                    <h4 class="text-xl font-semibold mb-3 text-gray-800">我们承诺：</h4>
                    <ul class="list-disc list-inside space-y-2">
                      <li>生物识别信息（声纹/面部特征等）、精确位置信息等敏感数据处理前，必通过动态弹窗+验证码（或生物特征）双重验证获取单独授权</li>
                      <li>所有敏感数据存储时实施AES-256加密与特征值脱敏，且不与账号直接关联存储</li>
                      <li>使用第三方AI服务时，仅传输去标识化数据片段并在协议中约束第三方：①禁止数据重组 ②境内存储 ③同步数据留存周期</li>
                    </ul>
                  </div>

                  <p class="mt-4">
                    在本服务使用过程中，根据适用的法律法规，在保障隐私安全的前提下，改善您与{ platformName.vue }的交互质量和您的体验。我们理解您输入的聊天信息、提交的信息反馈以及其他您向我们提供的信息中可能包含他人的个人信息，这种情况下请您务必在提供前取得他人的合法授权，避免造成他人个人信息的不当泄露。
                  </p>
                </div>

                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">1.3 性能与安全</h3>
                  <p>
                    为了优化系统性能与安全性，我们可能会获取您的设备硬件型号、操作系统版本、设备标识符（在Android设备上如AndroidID、OAID，iOS设备上如IDFV、IDFA；这些标识符在有效期、用户重置权限及获取方式上存在差异）、网络设备的硬件地址（如MAC地址）、IP地址、WLAN接入点信息（包括SSID和BSSID）、蓝牙状态、基站数据、软件版本、网络连接方式、网络状态、网络质量数据、操作记录、使用日志以及设备传感器数据（如加速度传感器和陀螺仪传感器），用于故障排查和性能优化。
                  </p>
                </div>

                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">1.4 信息使用规则</h3>
                  <p class="mb-4">
                    我们会在本隐私政策所涵盖的用途内使用收集的信息。如我们使用您的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的明示同意。
                  </p>
                  <p class="mb-4">根据相关法律法规的规定，我们在以下情况下收集和使用您的个人信息无需取得您的同意：</p>
                  <ol class="list-decimal list-inside space-y-2 ml-4">
                    <li>为订立、履行您作为一方当事人的合同所必需，或者按照依法制定的劳动规章制度和依法签订的集体合同实施人力资源管理所必需；</li>
                    <li>为履行法定职责或者法定义务所必需；</li>
                    <li>为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需；</li>
                    <li>为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理您的个人信息；</li>
                    <li>依照《个人信息保护法》规定在合理范围内处理您自行公开或者其他已经合法公开的个人信息；</li>
                    <li>法律、行政法规规定的其他情形。</li>
                  </ol>
                  <p class="mt-4">
                    若因提供服务所必要，我们从第三方间接获取您的个人信息的，我们会在收集前要求第三方对个人信息来源的合法性和合规性作出承诺，并要求其向您告知共享的信息内容，在依法取得您的同意后提供个人信息。同时，我们也将会严格遵守法律法规要求及与第三方的约定，保护和处理您的个人信息。
                  </p>
                  <p class="mt-4">
                    请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。
                  </p>
                </div>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">2. 我们如何使用Cookie等同类技术</h2>
                <p>
                  我们可能会使用Cookie和同类技术来提升您的使用体验，例如记录您的偏好设置、优化登录流程等。您可以通过浏览器设置管理或清除Cookie，但请注意，禁用Cookie可能会影响部分功能的正常使用。
                </p>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">3. 数据使用过程中涉及的合作方及信息转移</h2>
                <p class="mb-6">
                  我们可能会与第三方合作方共享必要的信息，以实现特定功能或服务。我们承诺，所有合作方均需遵守严格的数据保护协议，并仅在合法、正当、必要的范围内使用您的信息。我们不会对外公开披露所收集的个人信息，如必须公开披露时，我们会按照法律法规要求，向您告知此次公开披露的目的、披露信息的类型及可能涉及的敏感信息，并征得您的单独同意。
                </p>

                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">3.1 依法豁免征得同意提供、共享、转让、公开披露个人信息的情形：</h3>
                  <ol class="list-decimal list-inside space-y-2 ml-4">
                    <li>根据您的要求订立或履行合同所必需；</li>
                    <li>为履行法定职责或者法定义务所必需；</li>
                    <li>与国家安全、国防安全直接相关的；</li>
                    <li>与刑事侦查、起诉、审判和判决执行等直接相关的；</li>
                    <li>与公共安全、公共卫生、重大公共利益直接相关的；</li>
                    <li>为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需；</li>
                    <li>出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</li>
                    <li>为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理个人信息；</li>
                    <li>您自行向社会公众公开的个人信息，或依照相关法律规定处理其他已经合法公开的个人信息；</li>
                    <li>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</li>
                    <li>维护所提供产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障；</li>
                    <li>法律、行政法规规定的其他情形。</li>
                  </ol>
                </div>

                <div class="mb-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">3.2 目前，我们的授权合作伙伴包括以下类型：</h3>
                  <div class="space-y-6">
                    <div>
                      <h4 class="text-xl font-semibold mb-3 text-gray-800">（1）广告、分析服务类的授权合作伙伴</h4>
                      <p>
                        为了向您提供更优质的服务，我们可能会与广告和分析服务类的合作伙伴合作。在未获得您的明确授权或未对数据进行脱敏、匿名化处理的情况下，我们不会与这些合作伙伴共享您的个人身份信息。我们可能会向这些合作伙伴提供有关其广告覆盖范围、效果评估等方面的统计信息，但这些信息不会包含您的个人身份信息，或者我们会将其进行匿名化处理后提供。这些合作伙伴可能会将上述信息与他们合法获取的其他数据相结合，用于广告优化或决策建议。
                      </p>
                    </div>
                    <div>
                      <h4 class="text-xl font-semibold mb-3 text-gray-800">（2）供应商、服务提供商和其他合作伙伴</h4>
                      <p>
                        为支持我们的业务正常运行，我们可能会与供应商、服务提供商及其他合作伙伴共享必要的信息。这些合作伙伴可能为我们提供技术基础设施服务、分析服务使用情况、评估广告和服务的效果、提供客户服务支持、支付便利或协助开展学术研究及用户调查等。特别是在涉及存储服务时，我们会严格遵守相关规定，对存储内容采取严格的保密措施。如果涉及租用第三方存储空间的情况，我们会要求该第三方仅在必要范围内接触数据，并承担严格的保密义务。
                      </p>
                    </div>
                  </div>
                  <p class="mt-4">
                    我们会对合作伙伴获取信息的代码进行严格的安全监测，以确保数据处理的安全性。同时，我们会在相关目录中列明接入的合作伙伴，具体的数据处理详情请参阅合作伙伴的隐私政策或服务协议。
                  </p>
                </div>

                <div class="mb-8">
                  <p class="mb-4">
                    以下内容适用于 { platformName.vue } 的最新版本。如有针对特定目的的单独适用情况，将在下方明确说明。由于产品的持续迭代升级，部分历史版本的隐私实践可能与当前版本有所不同，请以实际情况为准。
                  </p>
                  
                  <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr class="bg-gray-100">
                          <th class="border border-gray-300 px-4 py-2 text-left">SDK名称</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">运营主体</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">隐私政策链接</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">收集信息范围</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">使用目的</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">信息获取方式</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-gray-300 px-4 py-2">微信Android SDK</td>
                          <td class="border border-gray-300 px-4 py-2">深圳市腾讯计算机系统有限公司</td>
                          <td class="border border-gray-300 px-4 py-2">
                            <a href="https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy" class="text-blue-600 hover:text-blue-700 underline" target="_blank">隐私政策</a>
                          </td>
                          <td class="border border-gray-300 px-4 py-2">设备信息</td>
                          <td class="border border-gray-300 px-4 py-2">用于帮助用户使用微信账号登录应用、帮助用户分享内容至微信客户端</td>
                          <td class="border border-gray-300 px-4 py-2">SDK本机采集</td>
                        </tr>
                        <tr class="bg-gray-50">
                          <td class="border border-gray-300 px-4 py-2">sentry SDK</td>
                          <td class="border border-gray-300 px-4 py-2">Functional Software, Inc.</td>
                          <td class="border border-gray-300 px-4 py-2">
                            <a href="https://sentry.io/privacy/" class="text-blue-600 hover:text-blue-700 underline" target="_blank">隐私政策</a>
                          </td>
                          <td class="border border-gray-300 px-4 py-2">设备信息：Android ID、IMEI、MEID、IMSI、MAC地址、设备型号、IP地址、传感器信息；网络信息：运营商信息、WIFI状态、网络类型</td>
                          <td class="border border-gray-300 px-4 py-2">-</td>
                          <td class="border border-gray-300 px-4 py-2">SDK本机采集</td>
                        </tr>
                        <tr>
                          <td class="border border-gray-300 px-4 py-2">adjust SDK</td>
                          <td class="border border-gray-300 px-4 py-2">adjust GmbH</td>
                          <td class="border border-gray-300 px-4 py-2">
                            <a href="https://www.adjust.com/terms/privacy-policy/" class="text-blue-600 hover:text-blue-700 underline" target="_blank">隐私政策</a>
                          </td>
                          <td class="border border-gray-300 px-4 py-2">设备信息：Android ID、设备型号、系统版本、屏幕分辨率、时区、语言设置、网络状态(WiFi/移动网络)、IP地址、应用安装列表</td>
                          <td class="border border-gray-300 px-4 py-2">-</td>
                          <td class="border border-gray-300 px-4 py-2">SDK本机采集</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">4. 我们如何存储您的个人信息</h2>
                <p>
                  我们依照法律法规的规定，将在中华人民共和国境内存储您的个人信息，并采取合理的技术和管理措施保障数据安全。我们不会向境外提供您的个人信息，除非获得您的明确同意、需要履行与您的合同义务，或为遵守法律法规要求。
                </p>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">5. 我们如何保护您的个人信息安全</h2>
                <p class="mb-4">
                  我们采用行业标准的安全措施保护您的个人信息，包括但不限于数据加密、访问控制和安全审计。您知悉并理解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。我们建议您采取积极措施（如设置复杂密码、定期修改密码、不将自己的账号密码及相关个人信息透露给他人。）保护您的账户安全。
                </p>
                <p class="mb-4">
                  我们可能会与第三方合作方共享必要的信息，以实现特定功能或服务。我们承诺，所有合作方均需遵守严格的数据保护协议，并仅在合法、正当、必要的范围内使用您的信息。我们不会对外公开披露所收集的个人信息，如必须公开披露时，我们会按照法律法规要求，向您告知此次公开披露的目的、披露信息的类型及可能涉及的敏感信息，并征得您的单独同意。
                </p>
                
                <div class="mb-6">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">安全事件应急处理</h3>
                  <p class="mb-4">
                    我们会制定完整的应急预案，在发生个人信息安全事件时将立即启动，以最大程度控制事件影响。如发生个人信息泄露、丢失等安全事件，我们将按照法律要求及时通知您以下内容：
                  </p>
                  <ol class="list-decimal list-inside space-y-2 ml-4">
                    <li>事件的基本情况及可能造成的影响；</li>
                    <li>我们已采取或将采取的处置措施；</li>
                    <li>您可自行采取的风险防范建议；</li>
                    <li>我们将为您提供的补救措施。</li>
                  </ol>
                  <p class="mt-4">
                    我们会通过推送通知、邮件、信函、短信等方式直接通知您；如难以逐一通知，将采取合理、有效的方式发布公告。同时，我们也会按要求向相关监管部门报告事件处置情况。
                  </p>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h4 class="text-xl font-semibold mb-3 text-gray-800">重要提醒</h4>
                  <p>
                    请注意，当您离开{ platformName.vue }服务前往其他网站或使用其他服务时，即使是通过{ platformName.vue }提供的链接访问，请您谨慎使用上述访问方式或服务，并注重保护自身在这些第三方平台上提供的个人信息隐私泄露风险，我们难以或无法保护您在第三方平台提供的个人信息。
                  </p>
                </div>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">6. 您如何行使个人信息权利</h2>
                <p class="mb-4">
                  我们高度重视您对个人信息的控制权，您有权查阅、复制、更正、补充、删除您的个人信息，也可以随时撤回授权同意、注销账号、进行投诉举报，以及自主设置隐私功能。您可通过以下方式行使这些权利：
                </p>
                <ul class="list-disc list-inside space-y-2 ml-4 mb-6">
                  <li>通过邮件（<a href={`mailto:${emailAddress}`} class="text-blue-600 hover:text-blue-700 underline">{emailAddress}</a>）与我们联系。我们将在接到您的常规请求之日起十五（15）日内予以反馈；因客观原因需延期的，将提前告知并说明理由（最长不超过法定60日期限）。若法律法规有特殊规定的，我们将按照法律法规规定的期限执行。</li>
                </ul>
                
                <div class="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 class="text-xl font-semibold mb-3 text-gray-800">账号注销说明</h3>
                  <p>
                    在您注销账号前，我们将验证您的个人身份、安全状态、设备信息等。您知悉并理解，注销账号是不可逆的行为，当您注销账号后，我们将停止为您提供任何服务，并在注销后<strong>15日</strong>内删除或匿名化有关您账号的一切信息，因法律法规规定需要留存个人信息的（如涉及我们作为电商平台的经营者，涉及商品和服务信息、交易等信息时，在您注销账号后，我们将根据《电子商务法》保留交易记录至交易完成后3年），我们承诺将其单独存储，并不会将该等信息用于日常业务活动中。
                  </p>
                </div>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">7. 未成年人隐私保护</h2>
                <p class="mb-4">我们非常重视未成年人的个人信息保护。</p>
                
                <div class="space-y-4">
                  <div class="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2 text-gray-800">18周岁以下用户</h4>
                    <p>若您未满18周岁，在使用{ platformName.vue }前，应事先取得您的父母或监护人的同意。</p>
                  </div>
                  
                  <div class="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2 text-gray-800">14周岁以下用户</h4>
                    <p>若您未满14周岁，在使用{ platformName.vue }之前，应当按照注册、使用流程，事先取得您的家长或法定监护人的同意，并由您的家长或法定监护人帮助您阅读并同意本隐私政策后完成{ platformName.vue }注册流程。</p>
                  </div>
                  
                  <div class="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2 text-gray-800">监护人责任</h4>
                    <p>若您是未满14周岁的未成年人的监护人，在使用{ platformName.vue }之前，应为您的被监护人阅读并同意本隐私政策。</p>
                  </div>
                </div>
                
                <p class="mt-6">
                  如果您发现我们在未获得监护人同意的情况下收集了未成年人的个人信息，请立即联系我们，我们将尽快删除相关数据。
                </p>
                <p class="mt-4">
                  监护人可通过专用通道（<a href={`mailto:${emailAddress}`} class="text-blue-600 hover:text-blue-700 underline">{emailAddress}</a>）提交身份证明文件，要求更正或删除未成年人信息，我们将在5个工作日内处理。
                </p>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">8. 隐私政策的修订和通知</h2>
                <p>
                  为了提供更好的服务，我们可能会不时更新本隐私政策。更新后的政策将在{ platformName.vue }官方网站或应用中发布，并通过适当的方式提醒您。未经您明确同意，我们不会削减您依据当前政策享有的权利。
                </p>
              </section>

              <section class="mb-12">
                <h2 class="text-3xl font-bold mb-6 text-gray-900">9. 联系我们</h2>
                <p>
                  如您对本隐私政策有任何疑问、意见或建议，请通过邮件与我们联系：<a href={`mailto:${emailAddress}`} class="text-blue-600 hover:text-blue-700 underline">{emailAddress}</a>
                </p>
              </section>
            </article>
          </main>
        </div>
      );
    };
  }
});
