Public Class NCEAdicionales
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Adicionales(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_ENTIDAD_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_ESTEREOTIPO_ADICIONALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ENTIDAD_IND", p_PPBIDEN_ENTIDAD_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_DatosBancarios(ByVal p_FTVCUEN_PIDM As Integer, ByVal p_FTVCUEN_CODE As String, ByVal p_FTVCUEN_BANC_CODE As String, ByVal p_FTVCUEN_MONE_CODE As String, ByVal p_FTVCUEN_TCUE_CODE As String, ByVal p_FTVCUEN_ESTADO_IND As String, Optional ByVal p_QUITAR_CTA_CONTAB_NULL_IND As String = "N") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_DATOS_BANCARIOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_PIDM", p_FTVCUEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_CODE", p_FTVCUEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_BANC_CODE", p_FTVCUEN_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_MONE_CODE", p_FTVCUEN_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_TCUE_CODE", p_FTVCUEN_TCUE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCUEN_ESTADO_IND", p_FTVCUEN_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_QUITAR_CTA_CONTAB_NULL_IND", p_QUITAR_CTA_CONTAB_NULL_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Adicionales(ByVal p_ITEMSCOUNT_DIRECCION As Integer, ByVal p_ITEMSDETAIL_DIRECCION As String,
                                           ByVal p_ITEMSCOUNT_DATOSBANCO As String, ByVal p_ITEMSDETAIL_DATOSBANCO As String,
                                           ByVal p_ITEMSCOUNT_TELEFONOS As String, ByVal p_ITEMSDETAIL_TELEFONOS As String,
                                           ByVal p_ITEMSCOUNT_EMAILS As String, ByVal p_ITEMSDETAIL_EMAILS As String,
                                           ByVal p_PIDM As Integer, ByVal p_USER As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERSONA_ESTEREOTIPO_ADICIONALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT_DIRECCION", p_ITEMSCOUNT_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL_DIRECCION", p_ITEMSDETAIL_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT_DATOSBANCO", p_ITEMSCOUNT_DATOSBANCO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL_DATOSBANCO", p_ITEMSDETAIL_DATOSBANCO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT_TELEFONOS", p_ITEMSCOUNT_TELEFONOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL_TELEFONOS", p_ITEMSDETAIL_TELEFONOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT_EMAILS", p_ITEMSCOUNT_EMAILS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL_EMAILS", p_ITEMSDETAIL_EMAILS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_USER, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
