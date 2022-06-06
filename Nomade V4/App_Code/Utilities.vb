Imports Microsoft.VisualBasic

Imports System.Threading
Imports System.Configuration
Imports SR = System.Reflection
Imports System.Text
Imports System.Web.UI.WebControls
Imports System.Security.Principal
Imports System.Data
Imports Newtonsoft.Json.Converters
Imports System.IO
Imports Newtonsoft.Json
Imports System.Drawing
Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System.Security.Cryptography
Imports System.Globalization


Public Class Utilities

    Private Const LOGON32_PROVIDER_DEFAULT As Integer = 0
    Private Const LOGON32_LOGON_INTERACTIVE As Integer = 2
    Private Const LOGON32_LOGON_NETWORK As Integer = 3
    Private Const LOGON32_LOGON_BATCH As Integer = 4
    Private Const LOGON32_LOGON_SERVICE As Integer = 5
    Private Const LOGON32_LOGON_UNLOCK As Integer = 7
    Private Const LOGON32_LOGON_NETWORK_CLEARTEXT As Integer = 8
    Private Const LOGON32_LOGON_NEW_CREDENTIALS As Integer = 9

    Private Shared ImpersonationContext As WindowsImpersonationContext

    Declare Function LogonUserA Lib "advapi32.dll" ( _
                            ByVal lpszUsername As String, _
                            ByVal lpszDomain As String, _
                            ByVal lpszPassword As String, _
                            ByVal dwLogonType As Integer, _
                            ByVal dwLogonProvider As Integer, _
                            ByRef phToken As IntPtr) As Integer

    Declare Auto Function DuplicateToken Lib "advapi32.dll" ( _
                            ByVal ExistingTokenHandle As IntPtr, _
                            ByVal ImpersonationLevel As Integer, _
                            ByRef DuplicateTokenHandle As IntPtr) As Integer
    Declare Auto Function RevertToSelf Lib "advapi32.dll" () As Long
    Declare Auto Function CloseHandle Lib "kernel32.dll" (ByVal handle As IntPtr) As Long

    Public Shared Function Datatable2Json(ByVal table As DataTable) As String

        ' Return JsonConvert.SerializeObject(table, Formatting.None)
        Try
            Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
            serializer.MaxJsonLength = 500000000
            Dim rows As New List(Of Dictionary(Of String, Object))
            Dim row As Dictionary(Of String, Object)

            If table Is Nothing Then
                Return "[]"
            Else
                For Each dr As DataRow In table.Rows
                    row = New Dictionary(Of String, Object)
                    For Each col As DataColumn In table.Columns
                        If col.DataType.Name = "DateTime" And Not dr(col) Is DBNull.Value Then
                            row.Add(col.ColumnName, dr(col).ToString())
                        Else
                            row.Add(col.ColumnName, dr(col))
                        End If
                    Next
                    rows.Add(row)
                Next
                Return serializer.Serialize(rows)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try

    End Function


    Public Shared Function json2Datatable(ByVal json As String) As DataTable


        Return JsonConvert.DeserializeObject(Of DataTable)(json)

    End Function

    Public Shared Function base642Image(ByVal base64String As String) As System.Drawing.Image

        Dim imageBytes As Byte() = Convert.FromBase64String(base64String)
        Dim ms As MemoryStream = New MemoryStream(imageBytes, 0, imageBytes.Length)
        ms.Write(imageBytes, 0, imageBytes.Length)
        Dim image As System.Drawing.Image = Drawing.Image.FromStream(ms, True)
        Return image

    End Function

    Public Shared Function image2Base64(ByVal image As System.Drawing.Image, ByVal format As System.Drawing.Imaging.ImageFormat) As String

        Dim ms As MemoryStream = New MemoryStream()
        image.Save(ms, format)
        Dim imageBytes As Byte() = ms.ToArray()
        Dim base64 As String = Convert.ToBase64String(imageBytes)

        Return base64

    End Function


    Public Shared Function ImpersonateValidUser(ByVal strUserName As String, _
           ByVal strDomain As String, ByVal strPassword As String) As Boolean
        Dim token As IntPtr = IntPtr.Zero
        Dim tokenDuplicate As IntPtr = IntPtr.Zero
        Dim tempWindowsIdentity As WindowsIdentity

        ImpersonateValidUser = False

        If RevertToSelf() <> 0 Then
            If LogonUserA(strUserName, strDomain, _
               strPassword, _
               LOGON32_LOGON_INTERACTIVE, _
               LOGON32_PROVIDER_DEFAULT, token) <> 0 Then
                If DuplicateToken(token, 2, tokenDuplicate) <> 0 Then
                    tempWindowsIdentity = New WindowsIdentity(tokenDuplicate)
                    ImpersonationContext = tempWindowsIdentity.Impersonate()

                    If Not (ImpersonationContext Is Nothing) Then
                        ImpersonateValidUser = True
                    End If
                End If
            End If
        End If

        If Not tokenDuplicate.Equals(IntPtr.Zero) Then
            CloseHandle(tokenDuplicate)
        End If

        If Not token.Equals(IntPtr.Zero) Then
            CloseHandle(token)
        End If

    End Function

    Public Shared Sub UndoImpersonation()

        ImpersonationContext.Undo()

    End Sub

    Public Shared Function JSONToDataTable(ByVal sCadenaJSON As String) As DataTable
        Try
            Dim oDT As DataTable = Newtonsoft.Json.JsonConvert.DeserializeObject(Of DataTable)(sCadenaJSON)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Shared Function DataTableToJSON(ByVal oDT As DataTable) As String
        Try
            Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
            serializer.MaxJsonLength = 500000000
            Dim rows As New List(Of Dictionary(Of String, Object))
            Dim row As Dictionary(Of String, Object)

            For Each dr As DataRow In oDT.Rows
                row = New Dictionary(Of String, Object)
                For Each col As DataColumn In oDT.Columns
                    If col.DataType.Name = "DateTime" And Not dr(col) Is DBNull.Value Then
                        row.Add(col.ColumnName, dr(col).ToString())
                    Else
                        row.Add(col.ColumnName, dr(col))
                    End If
                Next
                rows.Add(row)
            Next
            Return serializer.Serialize(rows)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Shared Function mEsNumero(ByVal sNumero As String) As Boolean
        Try
            Dim nNumero As Decimal
            nNumero = CDec(sNumero)
            Return True
        Catch ex As Exception
            Return False
        End Try
    End Function

    Public Shared Function mGetEmpresa(ByVal context As HttpContext) As String
        Try
            Dim sEmpresa As String = ""
            If context.Session("Empresa") IsNot Nothing Then
                sEmpresa = context.Session("Empresa").ToString()
            End If
            Return sEmpresa
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Shared Function mGetEstablecimiento(ByVal context As HttpContext) As String
        Try
            Dim sEstablecimiento As String = ""
            If context.Session("Establecimiento") IsNot Nothing Then
                sEstablecimiento = context.Session("Establecimiento").ToString()
            End If
            Return sEstablecimiento
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Shared Function DataTableToCadena(ByVal dt As DataTable) As String
        Dim cadenaenvio As String = ""
        Try
            For i As Integer = 0 To dt.Rows.Count - 1
                For j As Integer = 0 To dt.Columns.Count - 1
                    cadenaenvio = cadenaenvio & dt.Rows(i)(j) & ","
                Next
                cadenaenvio = cadenaenvio & ";"
            Next
            cadenaenvio = cadenaenvio & "]"

            cadenaenvio = cadenaenvio.Replace(",;", ";")
            cadenaenvio = cadenaenvio.Replace(";]", "")
        Catch ex As Exception

        End Try

        Return cadenaenvio

    End Function

    Public Shared Function FileToBase64(ByVal fileName As String) As String
        Return Convert.ToBase64String(System.IO.File.ReadAllBytes(fileName))
    End Function

    Public Shared Function Base64ImgToBytes(ByVal base64 As String) As Byte()
        Return Convert.FromBase64String(Strings.Split(base64, "base64,")(1))
    End Function

    Public Shared Function FileImgToBase64(ByVal fileName As String) As String
        If File.Exists(fileName) Then
            Dim base64String As String = Convert.ToBase64String(System.IO.File.ReadAllBytes(fileName))
            Return "data:image/jpeg;base64," & base64String
        Else
            Return ""
        End If
    End Function

    Public Shared Function fechaLocal(ByVal fecha As String) As String

        If fecha <> String.Empty Then
            Dim fechaConvertida As DateTime
            DateTime.TryParseExact(fecha, "dd/MM/yyyy", CultureInfo.CurrentCulture, DateTimeStyles.None, fechaConvertida)
            Return fechaConvertida.ToString("yyyy/MM/dd")
        Else
            Return "0000/00/00"
        End If

    End Function

End Class
